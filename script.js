function toggleMenu(id) {
    document.getElementById(id).classList.toggle("show");
}

function showPage(id) {
    const main = document.getElementById('main-content');
    if(id === 'mernis') {
        main.innerHTML = `
            <div class="stat-card">
                <h2>🆔 MERNİS 2026 SORGÜ</h2>
                <p style="color:#64748b; margin:20px 0;">Hedef T.C. Kimlik numarasını girerek WAYTAC tünellerine sızın.</p>
                <input type="text" placeholder="T.C. Kimlik No..." style="width:100%; padding:15px; background:#0b0f1a; border:1px solid #3b82f6; color:#fff; border-radius:8px; margin-bottom:20px;">
                <button onclick="alert('📡 [WAYTAC] Mernis Tüneli Ateşlendi!')" style="width:100%; padding:15px; background:#3b82f6; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">VERİLERİ ÇEK</button>
            </div>`;
    } else {
        location.reload();
    }
}

