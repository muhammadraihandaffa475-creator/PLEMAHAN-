// Script sederhana untuk menangani submit form
const serviceForm = document.getElementById('serviceForm');
if (serviceForm) {
    serviceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Di sini Anda biasanya akan mengirim data ke Backend (PHP/Node.js)
        // Untuk demo ini, kita hanya tampilkan alert
        alert('Terima kasih! Permohonan layanan Anda telah kami terima. Kami akan menghubungi Anda segera.');
        this.reset();
    });
}

// Script untuk slider layanan (Navigasi Kiri/Kanan)
const slider = document.getElementById('servicesSlider');
const leftBtn = document.getElementById('slideLeft');
const rightBtn = document.getElementById('slideRight');

if (slider && leftBtn && rightBtn) {
    leftBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -350, behavior: 'smooth' });
    });
    rightBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 350, behavior: 'smooth' });
    });
}

// Script untuk preview data form (Tabel)
const previewContainer = document.getElementById('preview-container');
const previewTableBody = document.getElementById('preview-table-body');
const previewTableHead = document.getElementById('preview-table-head');

// Daftar ID input yang akan dipantau
const inputIds = [
    { id: 'input-nama', label: 'Nama Lengkap' },
    { id: 'input-tanggal', label: 'Tanggal' },
    { id: 'input-desa', label: 'Desa' },
    { id: 'input-umur', label: 'Umur' },
    { id: 'input-jk', label: 'Jenis Kelamin' },
    { id: 'input-telepon', label: 'No Telepon' },
    { id: 'input-layanan', label: 'Jenis Pelayanan' }
];

function updatePreviewTable() {
    if (!previewTableBody || !previewTableHead) return;
    previewTableBody.innerHTML = '';
    previewTableHead.innerHTML = '';

    let rowNum = 1;

    const totalColumns = inputIds.length;

    // 1. Buat Header Kolom (A, B, C, ...)
    const headRow = document.createElement('tr');
    // Kolom pojok kiri atas (kosong/nomor)
    headRow.innerHTML = `<th class="w-10 bg-gray-100 border-b border-r border-gray-300"></th>`;
    
    // Huruf Kolom
    for (let index = 0; index < totalColumns; index++) {
        const letter = String.fromCharCode(65 + index); // A, B, C...
        headRow.innerHTML += `<th class="min-w-[150px] bg-gray-100 border-b border-r border-gray-300 text-xs font-bold text-gray-600 py-1">${letter}</th>`;
    }
    previewTableHead.appendChild(headRow);

    // 2. Baris 1: Label (Nama Kolom)
    const labelRow = document.createElement('tr');
    labelRow.innerHTML = `<td class="bg-gray-50 border-b border-r border-gray-300 text-center text-xs text-gray-500 font-mono select-none">${rowNum++}</td>`;
    
    inputIds.forEach(item => {
        labelRow.innerHTML += `<td class="border-b border-r border-gray-300 px-2 py-1 font-bold bg-gray-50 text-gray-700">${item.label}</td>`;
    });
    previewTableBody.appendChild(labelRow);

    // 3. Baris 2: Value (Isi Data)
    const valueRow = document.createElement('tr');
    valueRow.innerHTML = `<td class="bg-gray-50 border-b border-r border-gray-300 text-center text-xs text-gray-500 font-mono select-none">${rowNum++}</td>`;

    inputIds.forEach(item => {
        const el = document.getElementById(item.id);
        const value = el ? el.value : '-';
        valueRow.innerHTML += `<td class="border-b border-r border-gray-300 px-2 py-1 text-blue-700 bg-blue-50/30">${value || '-'}</td>`;
    });
    previewTableBody.appendChild(valueRow);
    
    // Tambahkan beberapa baris kosong untuk efek spreadsheet
    for(let i=0; i<5; i++) {
        const row = document.createElement('tr');
        let emptyCells = '';
        for(let j=0; j<totalColumns; j++) {
            emptyCells += `<td class="border-b border-r border-gray-300 px-2 py-1"></td>`;
        }
        
        row.innerHTML = `<td class="bg-gray-50 border-b border-r border-gray-300 text-center text-xs text-gray-500 font-mono select-none">${rowNum++}</td>${emptyCells}`;
        previewTableBody.appendChild(row);
    }
}

// Script untuk navigasi antar halaman form (Input <-> Review)
const btnNext = document.getElementById('btn-next');
const btnBack = document.getElementById('btn-back');
const inputSection = document.getElementById('input-section');
const reviewSection = document.getElementById('review-section');

if (btnNext && btnBack && inputSection && reviewSection) {
    btnNext.addEventListener('click', () => {
        // Validasi sederhana
        const inputs = inputSection.querySelectorAll('input[required], select');
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value) isValid = false;
        });

        if (isValid) {
            updatePreviewTable(); // Update data slider
            inputSection.classList.add('hidden');
            reviewSection.classList.remove('hidden');
        } else {
            alert('Mohon lengkapi semua data terlebih dahulu.');
        }
    });

    btnBack.addEventListener('click', () => {
        reviewSection.classList.add('hidden');
        inputSection.classList.remove('hidden');
    });
}

// Script untuk slider navigasi vertikal manual
document.querySelectorAll('.vertical-slider-container').forEach(container => {
    const track = container.querySelector('.vertical-slider-track');
    const upBtn = container.querySelector('.v-slide-up');
    const downBtn = container.querySelector('.v-slide-down');
    
    if (!track || !upBtn || !downBtn) return;

    let currentIndex = 0;
    const items = track.querySelectorAll('.tab');
    const totalItems = items.length;
    const itemHeight = 88 + 10; // Tinggi tombol (88px) + margin-bottom (10px)

    function updateSlider() {
        track.style.transform = `translateY(-${currentIndex * itemHeight}px)`;
        upBtn.disabled = currentIndex === 0;
        downBtn.disabled = currentIndex >= totalItems - 1;
    }

    upBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    downBtn.addEventListener('click', () => {
        if (currentIndex < totalItems - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    updateSlider(); // Inisialisasi posisi dan status tombol
});
