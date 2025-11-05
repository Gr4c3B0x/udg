<?php
header('Content-Type: application/json');

// 1. Baca data JSON yang dikirimkan dari frontend
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

// Cek jika data berhasil di-decode
if ($data === null) {
    echo json_encode(['success' => false, 'message' => 'Invalid JSON data.']);
    exit;
}

// Tentukan nama file
$filename = 'data_inputan.json';

// 2. Ambil data yang sudah ada dari file (jika ada)
$existing_data = [];
if (file_exists($filename)) {
    $file_content = file_get_contents($filename);
    $existing_data = json_decode($file_content, true);
    // Jika data tidak valid atau file kosong, inisialisasi sebagai array kosong
    if (!is_array($existing_data)) {
        $existing_data = [];
    }
}

// 3. Tambahkan data baru ke array data yang sudah ada
$existing_data[] = $data;

// 4. Encode kembali array data menjadi string JSON
// JSON_PRETTY_PRINT (opsional) untuk format yang rapi
$final_json = json_encode($existing_data, JSON_PRETTY_PRINT);

// 5. Simpan string JSON ke file
if (file_put_contents($filename, $final_json) !== false) {
    // Beri respons sukses ke frontend
    echo json_encode(['success' => true, 'message' => 'Data saved successfully!', 'filename' => $filename]);
} else {
    // Beri respons gagal
    echo json_encode(['success' => false, 'message' => 'Failed to write data to file. Check file permissions.']);
}

?>
