function toggleSidebar() { document.getElementById("sidebar").classList.toggle("active"); }
function toggleDropdown(id) { document.getElementById(id).classList.toggle("show"); }

function showSorgu(tip, placeholder) {
    const area = document.getElementById('dynamic-area');
    area.innerHTML = `
        <div class="sorgu-form animate-fade">
            <h2 style="color:#3b82f6; margin-bottom:15px;"><i class="fas fa-search"></i> WAYTAC | ${tip} SİSTEMİ</h2>
            <p style="color:#94a3b8; margin-bottom:20px;">Tünel Hazırlanıyor... Hedef veriyi giriniz.</p>
            <input type="text" placeholder="${placeholder} Giriniz..." id="sorgu_val">
            <button class="infaz-btn" onclick="infazRun('${tip}')">SORGULA & İNFAZ ET</button>
            <div id="log" style="margin-top:20px; font-family:monospace; color:#3b82f6; font-size:12px;"></div>
        </div>`;
    toggleSidebar(); // Menüyü kapat ki motoru görsün
}

function infazRun(tip) {
    const val = document.getElementById('sorgu_val').value;
    const log = document.getElementById('log');
    if(!val) return alert("HEDEF BOŞ!");
    log.innerHTML = "<p>📡 Tünel Açılıyor...</p>";
    setTimeout(() => { log.innerHTML += `<p>🔓 ${tip} Katmanına Sızıldı...</p>`; }, 1200);
    setTimeout(() => { log.innerHTML += `<p style='color:#fff;'>🛡️ DURUM: Hedef İnfaz Sırasına Alındı! #WAYTAC</p>`; }, 3000);
}
