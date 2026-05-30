export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  const cookie = request.headers.get("Cookie") || "";
  const isAuthenticated = cookie.includes("apps_auth=ok");

  if (isAuthenticated) {
    return next();
  }

  if (request.method === "POST") {
    const formData = await request.formData();
    const password = formData.get("password");

    if (env.APPS_PASSWORD && password === env.APPS_PASSWORD) {
      return new Response(null, {
        status: 302,
        headers: {
          "Location": url.pathname,
          "Set-Cookie": "apps_auth=ok; HttpOnly; Secure; SameSite=Lax; Path=/apps/private/; Max-Age=86400"
        }
      });
    }
  }

  return new Response(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Private Apps</title>
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;background:#f4f6f8;display:grid;place-items:center;min-height:100vh;margin:0;color:#111827;padding:24px}
    form{background:white;padding:32px;border-radius:18px;box-shadow:0 20px 50px rgba(0,0,0,.08);width:min(380px,92vw)}
    h1{margin-top:0;font-size:24px}input,button{width:100%;padding:12px;font-size:16px;margin-top:12px;box-sizing:border-box}button{border:0;border-radius:10px;background:#111827;color:white;cursor:pointer}.hint{font-size:13px;color:#6b7280}
  </style>
</head>
<body>
  <form method="POST">
    <h1>Private Apps</h1>
    <p>Enter password to continue.</p>
    <input type="password" name="password" placeholder="Password" required />
    <button type="submit">Unlock</button>
    <p class="hint">The QR Generator is public and does not require this password.</p>
  </form>
</body>
</html>`, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}
