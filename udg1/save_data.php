<?php
header('Content-Type: application/json');

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if ($data) {
    $file = 'comments.json';
    $current_comments = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

    // Tambahkan komentar baru dengan timestamp
    $new_comment = [
        'username' => htmlspecialchars($data['username']),
        'comment' => htmlspecialchars($data['comment']),
        'timestamp' => date('Y-m-d H:i:s')
    ];

    $current_comments[] = $new_comment;

    // Simpan kembali ke file JSON dengan format yang rapi
    file_put_contents($file, json_encode($current_comments, JSON_PRETTY_PRINT));

    echo json_encode(['status' => 'success', 'message' => 'Komentar berhasil disimpan!']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Data tidak valid.']);
}
?>
