// SIDEBAR (YAN MENÜ) AÇ/KAPAT
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

// DROPDOWN ODACIKLARI (MERNİS VB.) AÇ/KAPAT
function toggleDropdown(id) {
    document.getElementById(id).classList.toggle("show");
}

// SAYILARI CANLI ARTIRMA MOTORU
function boostStats() {
    let u = document.getElementById('total-users');
    let q = document.getElementById('total-queries');
    if(u) u.innerText = parseInt(u.innerText) + 1;
    if(q) q.innerText = parseInt(q.innerText) + 1;
}

// SORGU EKRANINI SAĞ TARAFA BASAN FONKSİYON
function showSorgu(tip, placeholder) {
    const area = document.getElementById('dynamic-area');
    area.innerHTML = `
        <div class="stat-card animate-fade">
            <h2 style="color:#3b82f6;"><i class="fas fa-search"></i> WAYTAC | ${tip} SİSTEMİ</h2>
            <p style="color:#94a3b8; margin:15px 0;">Veritabanı Katmanına Sızılıyor... Hedef veriyi giriniz.</p>
            <input type="text" placeholder="${placeholder} Giriniz..." id="s_val">
            <button class="infaz-btn" onclick="runInfaz('${tip}')">SORGULA & İNFAZ ET</button>
            <div id="log" style="margin-top:20px; font-family:monospace; color:#3b82f6; font-size:12px;"></div>
        </div>`;
    toggleSidebar(); // Menüyü kapat ki ekranı gör
}

// İNFAZ SİMÜLASYONU
function runInfaz(tip) {
    const val = document.getElementById('s_val').value;
    if(!val) return alert("HEDEF BELİRLENMEDİ!");
    
    boostStats(); // Sayıları artır!
    const log = document.getElementById('log');
    log.innerHTML = "<p>📡 Tünel Açılıyor...</p>";
    setTimeout(() => { log.innerHTML += `<p>🔓 ${tip} Katmanına Sızıldı...</p>`; }, 1000);
    setTimeout(() => { log.innerHTML += "<p style='color:#fff;'>🛡️ DURUM: Hedef İnfaz Sırasına Alındı! #WAYTAC</p>"; }, 2500);
}
