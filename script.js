/**
 * #WAYTAC PANEL - SİBER OPERASYON MOTORU v3.0
 * Görev: Menü kontrolü, Canlı İstatistikler ve İnfaz Akışı
 */

// 1. YAN MENÜ (SIDEBAR) KONTROLÜ
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    if (sidebar && overlay) {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    }
}

// 2. AÇILIR ODACIKLAR (DROPDOWN) KONTROLÜ
function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    if (dropdown) {
        dropdown.classList.toggle("show");
    }
}

// 3. GÜVENLİ ÇIKIŞ MÜHÜRÜ
function cikisYap() {
    localStorage.removeItem('waytac_session'); // Oturum mührünü sök
    alert("📡 Sistemden güvenli çıkış yapıldı. Kapıya yönlendiriliyorsunuz...");
    window.location.href = 'login.html'; // Giriş kapısına fırlat
}

// 4. CANLI VERİ MOTORU (SAYILARI ARTIRMA)
function boostStats() {
    const u = document.getElementById('total-users');
    const q = document.getElementById('total-queries');
    const d = document.getElementById('total-done');
    const tu = document.getElementById('today-users');

    if(u) u.innerText = parseInt(u.innerText) + 1;
    if(q) q.innerText = parseInt(q.innerText) + 1;
    if(d) d.innerText = parseInt(d.innerText) + 1;
    if(tu) tu.innerText = parseInt(tu.innerText) + 1;
}

// 5. SORGU ODACIKLARINI CANLANDIRAN MOTOR
function showSorgu(tip, placeholder) {
    const area = document.getElementById('dynamic-area');
    // Eğer dashboard'daysak veya alan temizse oraya bas
    const target = area ? area : document.getElementById('main-content');

    target.innerHTML = `
        <div class="stat-card animate-fade">
            <h2 style="color:#3b82f6;"><i class="fas fa-search"></i> WAYTAC | ${tip} SİSTEMİ</h2>
            <p style="color:#94a3b8; margin:20px 0;">Hedef veri katmanına sızılıyor... Lütfen bilgileri girin.</p>
            
            <div class="sorgu-form-inner">
                <input type="text" placeholder="${placeholder} Giriniz..." id="target_val" 
                style="width:100%; padding:15px; background:#0f172a; border:1px solid #334155; color:#fff; border-radius:8px; margin-bottom:15px; outline:none;">
                
                <button class="infaz-btn" onclick="runInfaz('${tip}')" 
                style="width:100%; padding:15px; background:#3b82f6; color:#fff; border:none; border-radius:10px; font-weight:bold; cursor:pointer; transition:0.3s;">
                SORGULA & İNFAZ ET
                </button>
            </div>
            
            <div id="terminal-log" style="margin-top:20px; font-family:monospace; color:#3b82f6; font-size:12px; line-height:1.6;"></div>
        </div>`;

    // Menü mobil moddaysa kapat
    if (window.innerWidth < 1024) {
        toggleSidebar();
    }
}

// 6. İNFAZ AKIŞI (SİBER SİMÜLASYON)
function runInfaz(tip) {
    const val = document.getElementById('target_val').value;
    const log = document.getElementById('terminal-log');
    
    if(!val) {
        alert("HEDEF BELİRLENMEDİ! SİBER BASINÇ DURDURULDU.");
        return;
    }

    // Gerçek zamanlı sayıları patlat!
    boostStats();

    log.innerHTML = "<p>📡 [WAYTAC] Tüneller Hazırlanıyor...</p>";
    
    setTimeout(() => { 
        log.innerHTML += `<p>🔓 ${tip} Veri Katmanına Sızıldı...</p>`; 
    }, 1200);

    setTimeout(() => { 
        log.innerHTML += `<p>🎯 Hedef: ${val} | Veriler Deşifre Ediliyor...</p>`; 
    }, 2800);

    setTimeout(() => { 
        log.innerHTML += "<p style='color:#fff; font-weight:bold;'>🛡️ DURUM: Hedef İnfaz Sırasına Alındı! #WAYTAC</p>"; 
    }, 4500);
}
