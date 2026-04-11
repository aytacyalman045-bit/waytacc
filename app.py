from flask import Flask, request, redirect
import os

app = Flask(__name__)

@app.route('/')
def logger():
    # Gelen ziyaretçinin bilgilerini terminale yazdır (Render loglarında görünür)
    user_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    user_agent = request.user_agent.string
    print(f"--- YENİ LOG --- IP: {user_ip} | Cihaz: {user_agent}")
    
    # Kullanıcıyı yönlendirmek istediğin adres (Başına mutlaka https:// koy)
    return redirect("https://google.com")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

