function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
    document.getElementById("overlay").classList.toggle("active");
}
function toggleDropdown(id) {
    document.getElementById(id).classList.toggle("show");
}
function cikisYap() {
    localStorage.removeItem('waytac_session');
    window.location.href = 'login.html';
}
function showSorgu(tip, placeholder) {
    const area = document.getElementById('dynamic-area');
    area.innerHTML = `
        <div class="stat-card animate-fade">
            <h2 style="color:#3b82f6;"><i class="fas fa-search"></i> ${tip} SİSTEMİ</h2>
            <input type="text" placeholder="${placeholder} Giriniz..." id="s_val" style="width:100%; padding:15px; background:#0f172a; border:1px solid #3b82f6; color:#fff; border-radius:8px; margin:20px 0;">
            <button class="infaz-btn" onclick="runInfaz('${tip}')" style="width:100%; padding:15px; background:#3b82f6; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">SORGULA</button>
            <div id="log" style="margin-top:20px; font-family:monospace; color:#3b82f6;"></div>
        </div>`;
    toggleSidebar();
}
function runInfaz(tip) {
    if(!document.getElementById('s_val').value) return alert("HEDEF BOŞ!");
    document.getElementById('total-queries').innerText = parseInt(document.getElementById('total-queries').innerText) + 1;
    const log = document.getElementById('log');
    log.innerHTML = "<p>📡 Tünel Açılıyor...</p>";
    setTimeout(() => { log.innerHTML += `<p style='color:#fff;'>🛡️ DURUM: Hedef İnfaz Sırasına Alındı! #WAYTAC</p>`; }, 2000);
}
