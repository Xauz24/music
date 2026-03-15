export async function onRequest(context) {
    const { request, env } = context;
    const { method } = request;
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    // PIN Check (POST leh DELETE tan chauh)
    if (method === "POST" || method === "DELETE") {
        const clientPin = request.headers.get("X-Admin-Pin");
        if (clientPin !== env.ADMIN_PIN) {
            return new Response("Unauthorized: PIN dik lo", { status: 401 });
        }
    }

    if (method === "GET") {
        const { results } = await env.DB.prepare("SELECT * FROM songs ORDER BY id DESC").all();
        return Response.json(results);
    }

    if (method === "POST") {
        const data = await request.json();
        await env.DB.prepare("INSERT INTO songs (title, url, lyrics) VALUES (?, ?, ?)")
            .bind(data.title, data.url, data.lyrics || "").run();
        return Response.json({ success: true });
    }

    if (method === "DELETE") {
        if (!id) return new Response("ID missing", { status: 400 });
        await env.DB.prepare("DELETE FROM songs WHERE id = ?").bind(parseInt(id)).run();
        return Response.json({ success: true });
    }

    return new Response("Method not allowed", { status: 405 });
}