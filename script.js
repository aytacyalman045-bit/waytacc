
function toggleMenu(id) {
    document.getElementById(id).classList.toggle("show");
}

function showPage(pageId) {
    const main = document.getElementById('main-content');
    if(pageId === 'mernis') {
        main.innerHTML = `
            <div class="stat-card" style="max-width:500px">
                <h2>🆔 MERNİS SORGÜ 2026</h2>
                <p style="color:#64748b; margin:15px 0;">Hedef T.C. Kimlik numarasını girerek veritabanına sızın.</p>
                <input type="text" placeholder="T.C. Kimlik No..." style="width:100%; padding:12px; background:#0b0f1a; border:1px solid #3b82f6; color:#fff; border-radius:8px; margin-bottom:15px;">
                <button onclick="alert('📡 [WAYTAC] Mernis Tüneli Açıldı!')" style="width:100%; padding:12px; background:#3b82f6; color:#fff; border:none; border-radius:8px; font-weight:bold; cursor:pointer;">SORGULA</button>
            </div>`;
    } else {
        location.reload(); // Dashboard'a dönmek için en temizi
    }
}
