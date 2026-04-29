function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}

function toggleDropdown(id) {
    document.getElementById(id).classList.toggle("show");
}

function showSorgu(tip, placeholder) {
    const area = document.getElementById('dynamic-area');
    area.innerHTML = `
        <div class="stat-card animate-fade">
            <h2 style="color:#3b82f6;"><i class="fas fa-search"></i> WAYTAC | ${tip}</h2>
            <p style="color:#94a3b8; margin:20px 0;">Veritabanına sızılıyor... Hedef veriyi giriniz.</p>
            <input type="text" placeholder="${placeholder} Giriniz..." id="s_val">
            <button class="infaz-btn" onclick="runInfaz('${tip}')">SORGULA & İNFAZ ET</button>
            <div id="log" style="margin-top:20px; font-family:monospace; color:#3b82f6; font-size:12px;"></div>
        </div>`;
    toggleSidebar(); // Menüyü kapat
}

function runInfaz(tip) {
    if(!document.getElementById('s_val').value) return alert("HEDEF BOŞ!");
    // Sayı Artırma Simülasyonu
    document.getElementById('total-queries').innerText = parseInt(document.getElementById('total-queries').innerText) + 1;
    const log = document.getElementById('log');
    log.innerHTML = "<p>📡 Tünel Açılıyor...</p>";
    setTimeout(() => { log.innerHTML += `<p>🔓 ${tip} Katmanına Sızıldı...</p>`; }, 1200);
    setTimeout(() => { log.innerHTML += "<p style='color:#fff;'>🛡️ DURUM: İnfaz Sırasına Alındı! #WAYTAC</p>"; }, 2500);
}
