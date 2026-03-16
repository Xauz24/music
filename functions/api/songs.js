export async function onRequest(context) {
    const { request, env } = context;
    const { method } = request;
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    // PIN Check (POST leh DELETE tan chauh)
    if (method === "POST" || method === "DELETE") {
        const clientPin = request.headers.get("x-admin-pin");
        const serverPin = env.ADMIN_PIN;

        // Space awm palh pawh nawt faiin (trim), an in-ang chiah em kan check ang
        if (!clientPin || !serverPin || String(clientPin).trim() !== String(serverPin).trim()) {
            return Response.json({ error: "Unauthorized: PIN dik lo" }, { status: 401 });
        }
    }

    try {
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
            if (!id) return Response.json({ error: "ID missing" }, { status: 400 });
            await env.DB.prepare("DELETE FROM songs WHERE id = ?").bind(parseInt(id)).run();
            return Response.json({ success: true });
        }

        return Response.json({ error: "Method not allowed" }, { status: 405 });
        
    } catch (error) {
        // Database lamah thil dik lo a awm thut pawhin a chhan chiang deuhin a rawn hrilh ang che
        return Response.json({ error: error.message }, { status: 500 });
    }
}