export function debugHealthLog({ url, status, body } = {}) {
  // Keep logs consistent and short.
  // body can be large; attempt to stringify safely.
  let bodyPreview = body;
  try {
    if (body && typeof body === "object") {
      bodyPreview = JSON.stringify(body).slice(0, 400);
    }
  } catch {
    // ignore
  }

  // eslint-disable-next-line no-console
  console.log("[health-check] url=", url, "status=", status, "body=", bodyPreview);
}

