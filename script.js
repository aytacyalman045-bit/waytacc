function showPage(pageId) {
    const mainArea = document.getElementById('content');
    let contentHtml = "";

    if (pageId === 'mernis') {
        contentHtml = `
            <div class="page">
                <h1 style="text-shadow: 0 0 10px #00ff00;">🆔 MERNİS SORGÜ SİSTEMİ</h1>
                <div class="sorgu-card">
                    <p style="color:#888; margin-bottom:20px;">T.C. Kimlik No ile güncel Mernis-2024 veritabanına sızın.</p>
                    <input type="text" placeholder="T.C. Kimlik No Giriniz..." id="tc_input">
                    <button onclick="infazTrigger('Mernis')">VERİLERİ GETİR</button>
                </div>
            </div>`;
    } else if (pageId === 'vip') {
        contentHtml = `
            <div class="page">
                <h1 style="color:#ff00ff; text-shadow: 0 0 15px #ff00ff;">💎 VIP ÖZEL İNFAZ PANELİ</h1>
                <div class="sorgu-card" style="border-color:#ff00ff; box-shadow: 0 0 30px rgba(255, 0, 255, 0.4);">
                    <p style="color:#ff00ff; margin-bottom:20px;">Vesikalık, Tapu ve Soyağacı veritabanlarına tam erişim.</p>
                    <input type="text" placeholder="Hedef Bilgisi Giriniz..." style="border-color:#ff00ff; color:#ff00ff;">
                    <button style="background:#ff00ff; color:#fff;" onclick="infazTrigger('VIP Özel')">KRİTİK VERİYE SIZ</button>
                </div>
            </div>`;
    } else if (pageId === 'gsm') {
        contentHtml = `
            <div class="page">
                <h1>📱 GSM & OPERATÖR SORGÜ</h1>
                <div class="sorgu-card">
                    <input type="text" placeholder="Telefon Numarası (5xx)..." id="gsm_input">
                    <button onclick="infazTrigger('GSM')">NUMARADAN SIZ</button>
                </div>
            </div>`;
    } else {
        contentHtml = `
            <div class="page">
                <h1>🏠 #WAYTAC DASHBOARD</h1>
                <p style="color:#888;">Operasyon Merkezi Aktif. Sol menüdeki odacıklardan siber infazı başlat.</p>
                <div style="border: 1px dashed #333; padding: 20px; margin-top:30px;">
                    <p>Mert: <span style="color:red;">DEAKTİF (İndirildi)</span></p>
                    <p>Yusuf: <span style="color:orange;">TAKİPTE (Pazar Dağıtıldı)</span></p>
                    <p>Toprak: <span style="color:green;">SIRADAKİ (İnfaz Bekliyor)</span></p>
                </div>
            </div>`;
    }

    mainArea.innerHTML = contentHtml;
}

function infazTrigger(type) {
    alert("📡 [" + type + "] Tüneli Açılıyor... Veri Katmanlarına Sızılıyor. #WAYTAC");
}

// Sayfa yüklendiğinde Dashboard'u göster
window.onload = () => showPage('dashboard');
