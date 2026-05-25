const API_URL = import.meta.env.VITE_API_URL;

// Early runtime proof
console.log("[env] import.meta.env.VITE_API_URL=", API_URL);

// Helpers
function isProbablyJSON(contentType) {
  return (contentType || "").toLowerCase().includes("application/json");
}

function formatFetchError(error) {
  if (!error) return "Request failed";

  const msg = error?.message || String(error);

  if (msg.toLowerCase().includes("failed to fetch")) {
    return "Backend is offline (failed to fetch). Is the backend running on the expected port?";
  }

  if (msg.toLowerCase().includes("abort")) {
    return "Request timed out. Backend may be starting up or overloaded.";
  }

  return msg;
}

async function parseJsonSafe(resp) {
  const contentType = resp.headers.get("content-type") || "";

  if (isProbablyJSON(contentType)) {
    return resp.json();
  }

  const text = await resp.text();

  let maybeMessage = text;

  try {
    const obj = JSON.parse(text);
    maybeMessage = obj?.message || text;
  } catch {
    // ignore
  }

  const err = new Error(
    `Non-JSON response from backend (content-type: ${
      contentType || "unknown"
    }). ${String(maybeMessage).slice(0, 200)}`
  );

  err.status = resp.status;
  err.raw = text;

  throw err;
}

export class ApiError extends Error {
  constructor(message, { status, details } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export function getApiUrl() {
  if (!API_URL) {
    console.warn(
      "[env] VITE_API_URL missing; using http://localhost:5000 as fallback"
    );

    return "http://localhost:5000";
  }

  return API_URL;
}

export async function apiFetch(path, options = {}) {
  const url = `${getApiUrl()}${
    path.startsWith("/") ? path : `/${path}`
  }`;

  const {
    timeoutMs = 12000,
    retryOn = ["backend_offline", "timeout"],
    retryCount = 1,
    retryDelayMs = 600,
    ...fetchOptions
  } = options;

  let attempt = 0;

  while (true) {
    attempt += 1;

    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const resp = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          ...(fetchOptions.headers || {}),
        },
      });

      clearTimeout(timeoutId);

      const data = await parseJsonSafe(resp).catch((err) => {
        if (resp?.status) err.status = resp.status;
        throw err;
      });

      if (!resp.ok) {
        const message =
          data?.message ||
          data?.error ||
          `Request failed with status ${resp.status}`;

        throw new ApiError(message, {
          status: resp.status,
          details: data,
        });
      }

      return data;
    } catch (err) {
      clearTimeout(timeoutId);

      const msg = formatFetchError(err);

      const status = err?.status;

      const lowered = String(msg).toLowerCase();

      const isOffline =
        lowered.includes("backend is offline") ||
        lowered.includes("failed to fetch") ||
        lowered.includes("connection refused") ||
        err?.name === "TypeError";

      const isTimeout =
        lowered.includes("timed out") ||
        err?.name === "AbortError";

      const reason = isOffline
        ? "backend_offline"
        : isTimeout
        ? "timeout"
        : "other";

      const shouldRetry =
        attempt <= retryCount + 1 &&
        retryOn.includes(reason);

      if (!shouldRetry) {
        throw new ApiError(msg, {
          status,
          details: err?.details || err,
        });
      }

      if (retryDelayMs > 0) {
        await new Promise((r) =>
          setTimeout(r, retryDelayMs)
        );
      }
    }
  }
}

// FIXED HEALTH CHECK
export async function waitForBackendReady({
  intervalMs = 500,
} = {}) {
  while (true) {
    console.log(
      "[health-check] retrying backend connection..."
    );

    try {
      const url = `${getApiUrl()}/api/health`;

      console.log("[health-check] calling:", url);

      const controller = new AbortController();

      const timeout = setTimeout(
        () => controller.abort(),
        2000
      );

      const resp = await fetch(url, {
        method: "GET",
        signal: controller.signal,
      });

      clearTimeout(timeout);

      console.log(
        "[health-check] status:",
        resp.status
      );

      if (resp.ok) {
        console.log(
          "[health-check] backend ready!"
        );

        return true;
      }
    } catch (e) {
      console.log(
        "[health-check] failed:",
        e?.name || "error",
        e?.message || ""
      );
    }

    await new Promise((r) =>
      setTimeout(r, intervalMs)
    );
  }
}