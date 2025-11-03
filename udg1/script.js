document.getElementById('commentForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Mencegah form melakukan submit standar

    const formData = new FormData(event.target);
    const jsonData = Object.fromEntries(formData.entries());
    const jsonString = JSON.stringify(jsonData);

    // Kirim data ke skrip PHP menggunakan Fetch API
    fetch('save_comment.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Memberi tahu server bahwa body adalah JSON
        },
        body: jsonString
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
        if (data.status === 'success') {
            document.getElementById('commentForm').reset();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'Terjadi kesalahan saat mengirim komentar.';
    });
});




