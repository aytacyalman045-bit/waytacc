function infaz() {
    let target = document.getElementById("target").value;
    let output = document.getElementById("output");
    if(!target) { 
        output.innerHTML = "<p style='color:red;'>⚠️ HEDEF BELİRLENMEDİ!</p>"; 
        return; 
    }
    
    output.innerHTML = "<p>📡 [WAYTAC] Siber Tüneller Hazırlanıyor...</p>";
    setTimeout(() => { 
        output.innerHTML += `<p>🔓 Mernis-2024 Veri Katmanına Sızıldı...</p>`; 
    }, 1200);
    setTimeout(() => { 
        output.innerHTML += `<p>🎯 Hedef: ${target} | Veritabanı Taranıyor...</p>`; 
    }, 2800);
    setTimeout(() => { 
        output.innerHTML += "<p style='color:white; font-weight:bold;'>🛡️ DURUM: Hedef İnfaz Listesine Mühürlendi! #WAYTAC</p>"; 
    }, 4500);
}
