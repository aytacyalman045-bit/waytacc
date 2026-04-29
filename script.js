function toggleSidebar() { document.getElementById("sidebar").classList.toggle("active"); }
function toggleDropdown(id) { document.getElementById(id).classList.toggle("show"); }

// GERÇEK ZAMANLI SAYI ARTIRMA
function boostStats() {
    let u = document.getElementById('total-users');
    let q = document.getElementById('total-queries');
    let d = document.getElementById('total-done');
    let tu = document.getElementById('today-users');

    u.innerText = parseInt(u.innerText) + 1;
    q.innerText = parseInt(q.innerText) + 1;
    d.innerText = parseInt(d.innerText) + 1;
    tu.innerText = parseInt(tu.innerText) + 1;
}

function showSorgu(tip, placeholder) {
    const area = document.getElementById('dynamic-area');
    area.innerHTML = `
        <div class="stat-card">
            <h2 style="color:#3b82f6;"><i class="fas fa-search"></i> ${tip} SİSTEMİ</h2>
            <p style="color:#94a3b8; margin:20px 0;">Hedef veriyi girerek WAYTAC tünellerine sızın.</p>
            <input type="text" placeholder="${placeholder} Giriniz..." id="s_val">
            <button class="infaz-btn" onclick="runInfaz('${tip}')">SORGULA & İNFAZ ET</button>
            <div id="log" style="margin-top:20px; font-family:monospace; color:#3b82f6;"></div>
        </div>`;
    toggleSidebar();
}

function runInfaz(tip) {
    if(!document.getElementById('s_val').value) return alert("HEDEF BOŞ!");
    boostStats(); // HER SORGULA DEYİŞİNDE SAYILARI ARTIR!
    const log = document.getElementById('log');
    log.innerHTML = "<p>📡 Tünel Açılıyor...</p>";
    setTimeout(() => { log.innerHTML += `<p>🔓 ${tip} Katmanına Sızıldı...</p>`; }, 1000);
    setTimeout(() => { log.innerHTML += "<p style='color:#fff;'>🛡️ DURUM: İnfaz Sırasına Alındı! #WAYTAC</p>"; }, 2500);
}

