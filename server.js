// Custom server for cPanel's Node.js App (Passenger) hosting.
// Not used by Vercel or `next dev` — those run Next.js's own built-in server.
// Passenger sets process.env.PORT to the port it expects this app to listen on.
const { createServer } = require("http");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, () => {
    console.log(`> Server listening on port ${port} as ${dev ? "development" : "production"}`);
  });
});
