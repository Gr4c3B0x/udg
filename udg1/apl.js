const form = document.getElementById('myForm');
        const responseMessage = document.getElementById('responseMessage');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            responseMessage.textContent = 'Mengirim...';

            const data = new FormData(form);
            const action = e.target.action;
            
            fetch(action, {
                method: 'POST',
                body: data,
            })
            .then(() => {
                responseMessage.textContent = 'Data berhasil dikirim ke Google Sheets!';
                form.reset(); // Kosongkan formulir setelah sukses
            })
            .catch(error => {
                console.error('Error:', error);
                responseMessage.textContent = 'Terjadi kesalahan saat mengirim data.';
            });
        });
