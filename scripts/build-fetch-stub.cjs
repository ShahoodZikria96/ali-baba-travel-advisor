// Preloaded (via NODE_OPTIONS=--require) before "next build" runs.
//
// Node's real fetch/Request/Response/Headers globals are backed by undici,
// which lazily compiles a WASM HTTP parser (llhttp) the first time any of
// them is touched. On this host that WASM instantiation always OOMs, no
// matter how small the actual usage, because it exceeds the host's 4GB LVE
// address-space cap. We run node with --no-experimental-fetch (set alongside
// this preload) so those globals never exist in the first place, then define
// harmless stand-ins here so Next's own code — which does
// `class NextRequest extends Request` at module-load time, purely for type
// plumbing during the static build — has something constructable to extend.
// The build never actually sends a real HTTP request through these classes.
class StubHeaders extends Map {}
class StubRequest {
  constructor(input, init) {
    this.url = typeof input === "string" ? input : (input && input.url) || "";
    this.method = (init && init.method) || "GET";
    this.headers = new StubHeaders();
  }
}
class StubResponse {
  constructor(body, init) {
    this.body = body;
    this.status = (init && init.status) || 200;
    this.headers = new StubHeaders();
  }
  static json(data, init) {
    return new StubResponse(JSON.stringify(data), init);
  }
}

if (typeof globalThis.Headers === "undefined") globalThis.Headers = StubHeaders;
if (typeof globalThis.Request === "undefined") globalThis.Request = StubRequest;
if (typeof globalThis.Response === "undefined") globalThis.Response = StubResponse;
if (typeof globalThis.fetch === "undefined") {
  globalThis.fetch = () => {
    throw new Error("fetch() is stubbed out during the production build on this host and cannot be called.");
  };
}
