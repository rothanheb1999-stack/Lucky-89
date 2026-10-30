export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/data") {
      if (request.method === "GET") {
        const value = await env.DATA.get("mydata");
        return new Response(value || "{}", {
          headers: { "Content-Type": "application/json" },
        });
      }
      if (request.method === "POST") {
        const body = await request.text();
        await env.DATA.put("mydata", body);
        return new Response("ok");
      }
      return new Response("Method not allowed", { status: 405 });
    }

    // Everything else: serve the normal website files
    return env.ASSETS.fetch(request);
  },
};
