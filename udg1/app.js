document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah submit formulir default

    // Mengambil data formulir
    const form = event.target;
    const formData = new FormData(form);
    
    // Mengubah FormData menjadi objek JavaScript biasa
    const dataObject = Object.fromEntries(formData.entries());

    // Mengubah objek menjadi string JSON
    const jsonData = JSON.stringify(dataObject);

    // Kirim data ke server (backend)
    fetch('save_data.php', { // Ganti save_data.php dengan URL endpoint backend Anda
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        const messageElement = document.getElementById('message');
        if (data.success) {
            messageElement.textContent = `✅ Data berhasil disimpan! File: ${data.filename}`;
            form.reset(); // Kosongkan formulir awaaaaaalllllllll
        } else {
            messageElement.textContent = `❌ Gagal menyimpan data: ${data.message}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = '❌ Terjadi kesalahan saat mengirim data.';
    });
});




