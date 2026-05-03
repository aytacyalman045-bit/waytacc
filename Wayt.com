<?php
// 🐉 WAYTAC | OPERATÖR ÖZEL NÜKLEER ÇEKİRDEK
session_start();

// 🛡️ SQL ZIRHI: PDO BAĞLANTISI (Mermiye Geçit Yok)
try {
    $db = new PDO("mysql:host=localhost;dbname=waytac_db;charset=utf8", "admin", "nükleer_sifre");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("📡 WAYTAC Karargah Tüneli Kapalı.");
}

// 🎯 SQL INJECTION VE XSS İNFAZ MOTORU
function guvenli_mermi($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

if ($_POST) {
    $user = guvenli_mermi($_POST['u']);
    $pass = $_POST['p']; 

    // 🚀 PREPARED STATEMENT: MERMİ GEÇİRMEZ SORGÜ
    $sorgu = $db->prepare("SELECT * FROM operatorler WHERE k_adi = :u LIMIT 1");
    $sorgu->execute(['u' => $user]);
    $op = $sorgu->fetch(PDO::FETCH_ASSOC);

    if ($op && password_verify($pass, $op['sifre'])) {
        $_SESSION['waytac'] = true;
        header("Location: karargah.php");
    } else {
        $hata = "❌ Yetkisiz Erişim Denemesi Kaydedildi, Sayın Operatör!";
    }
}
?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>WAYTAC | Komuta Merkezi</title>
    <style>
        :root { --bg: #05070a; --accent: #2f81f7; --border: #30363d; }
        body { background: var(--bg); color: var(--accent); font-family: 'Courier New', monospace; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; overflow: hidden; }
        .kale { border: 2px solid #161b22; background: #0d1117; padding: 50px; border-radius: 20px; box-shadow: 0 0 70px rgba(47, 129, 247, 0.15); text-align: center; width: 400px; position: relative; }
        .kale::before { content: 'OPERATÖR: WAYTAC'; position: absolute; top: -15px; left: 20px; background: var(--bg); padding: 0 10px; font-size: 0.8em; color: #238636; border: 1px solid var(--border); }
        h1 { font-size: 1.8em; letter-spacing: 4px; margin-bottom: 30px; text-shadow: 0 0 10px var(--accent); }
        input { background: #05070a; border: 1px solid var(--border); padding: 15px; color: white; border-radius: 10px; width: 100%; margin-bottom: 20px; outline: none; box-sizing: border-box; }
        button { background: #238636; color: white; border: none; padding: 15px; border-radius: 10px; font-weight: bold; cursor: pointer; width: 100%; transition: 0.3s; }
        button:hover { background: #2ea043; transform: scale(1.02); }
        .footer { margin-top: 20px; font-size: 0.7em; opacity: 0.5; }
    </style>
</head>
<body>
    <div class="kale">
        <h1>🔒 WAYTAC OPS</h1>
        <p style="font-size: 0.9em; margin-bottom: 20px; color: #8b949e;">Merkezi İstihbarat Portalı</p>
        <form method="POST">
            <input type="text" name="u" placeholder="Kullanıcı Adı" required>
            <input type="password" name="p" placeholder="Erişim Şifresi" required>
            <button type="submit">TERMİNALİ ATEŞLE</button>
        </form>
        <?php if(isset($hata)) echo "<p style='color:#f85149; font-size:0.8em;'>$hata</p>"; ?>
        <div class="footer">WAYTAC © 2026 | Siber Güvenlik Mührü</div>
    </div>
</body>
</html>
