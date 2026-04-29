/**
 * #WAYTAC PANEL - GÜNCELLENMİŞ SİBER OPERASYON MOTORU v3.1
 * Görev: Menü kontrolü, Görsel Uyumlu Dropdown ve İnfaz Akışı
 */

// 1. YAN MENÜ (SIDEBAR) KONTROLÜ - 3 Çizgili Menü İçin
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("overlay");
    if (sidebar && overlay) {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    }
}

// 2. GÖRSELDEKİ DROPDOWN MANTIĞI (Mernis 2026, Aile vb.)
document.querySelectorAll('.dropbtn').forEach(button => {
    button.addEventListener('click', function() {
        const dropdownContent = this.nextElementSibling;
        const arrow = this.querySelector('.arrow');
        
        // Menüyü aç/kapat
        const isOpen = dropdownContent.style.display === 'block';
        dropdownContent.style.display = isOpen ? 'none' : 'block';
        
        // Oku döndür (Görseldeki gibi > işaretini aşağı döndürür)
        if (arrow) {
            arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    });
});

// 3. GÜVENLİ ÇIKIŞ MÜHÜRÜ
function cikisYap() {
    if(confirm("📡 Sistemden güvenli çıkış yapılsın mı?")) {
        localStorage.removeItem('waytac_session');
        window.location.href = 'login.html';
    }
}

// 4. CANLI VERİ MOTORU
function boostStats() {
    const u = document.getElementById('total-users');
    const q = document.getElementById('total-queries');
    if(u) u.innerText = (parseInt(u.innerText.replace('.', '')) + 1).toLocaleString('tr-TR');
    if(q) q.innerText = (parseInt(q.innerText.replace('.', '')) + 1).toLocaleString('tr-TR');
}

// 5. SORGU ODACIKLARINI CANLANDIRAN MOTOR
function showSorgu(tip, placeholder) {
    const area = document.getElementById('dynamic-area');
    const target = area ? area : document.getElementById('main-content');

    target.innerHTML = `
        <div class="stat-card animate-fade" style="background:#111827; border:1px solid #1e293b; border-radius:20px; padding:30px;">
            <h2 style="color:#3b82f6; font-size:20px;"><i class="fas fa-terminal"></i> WAYTAC | ${tip} SİSTEMİ</h2>
            <p style="color:#94a3b8; margin:15px 0; font-size:14px;">Hedef veri katmanı analiz ediliyor...</p>
            
            <div class="sorgu-form-inner">
                <input type="text" placeholder="${placeholder} Giriniz..." id="target_val" 
                style="width:100%; padding:12px; background:#1f2937; border:1px solid #374151; color:#fff; border-radius:8px; margin-bottom:15px; outline:none;">
                
                <button class="infaz-btn" onclick="runInfaz('${tip}')" 
                style="width:100%; padding:12px; background:#3b82f6; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">
                SORGULA
                </button>
            </div>
            
            <div id="terminal-log" style="margin-top:20px; font-family:monospace; color:#3b82f6; font-size:12px; line-height:1.6; background:#000; padding:10px; border-radius:5px;"></div>
        </div>`;

    // Mobilde sorgu seçince menüyü kapat
    if (window.innerWidth < 1024) {
        toggleSidebar();
    }
}

// 6. İNFAZ AKIŞI
function runInfaz(tip) {
    const val = document.getElementById('target_val').value;
    const log = document.getElementById('terminal-log');
    
    if(!val) {
        log.innerHTML = "<p style='color:#ef4444;'>⚠️ HATA: Veri girişi yapılmadı.</p>";
        return;
    }

    boostStats();
    log.innerHTML = "<p>📡 Protokoller başlatılıyor...</p>";
    
    setTimeout(() => { log.innerHTML += `<p>🔓 ${tip} bağlantısı kuruldu...</p>`; }, 800);
    setTimeout(() => { log.innerHTML += `<p>🎯 Hedef: ${val} analiz ediliyor...</p>`; }, 1800);
    setTimeout(() => { log.innerHTML += "<p style='color:#10b981; font-weight:bold;'>🛡️ DURUM: İşlem başarılı! #WAYTAC</p>"; }, 3000);
}
