# TODO

## Backend-first vs Frontend-first startup error
- [ ] Update `frontend/src/utils/api.js` to broaden “backend offline” detection and retry on network failures during backend startup.
- [ ] Update `frontend/src/main.jsx` / app bootstrapping so API-dependent routes don’t run until `waitForBackendReady()` succeeds (or provide a consistent placeholder).
- [ ] Run frontend + backend in both orderings and verify no “Backend is offline” error appears.

