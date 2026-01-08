import { AlatRepository } from '../lib/firebase-repositories';

const alatData = [
  {
    nama: 'BIOPAC',
    deskripsi: 'Sistem akuisisi data fisiologis untuk penelitian biomedis',
    gambar: '/Biopac.jpg',
    jumlahTotal: 5,
    jumlahTersedia: 5,
    spesifikasi: 'BIOPAC MP36, 4 channel analog input, sampling rate up to 200kHz',
  },
  {
    nama: 'Osiloskop Digital',
    deskripsi: 'Osiloskop digital untuk analisis sinyal elektronik',
    gambar: '/Osiloskop.jpg',
    jumlahTotal: 8,
    jumlahTersedia: 8,
    spesifikasi: 'Bandwidth 100MHz, 2 channel, sampling rate 1GSa/s',
  },
  {
    nama: 'Power Supply',
    deskripsi: 'Power supply DC adjustable untuk praktikum elektronika',
    gambar: '/PowerSupply.jpg',
    jumlahTotal: 10,
    jumlahTersedia: 10,
    spesifikasi: 'Output: 0-30V DC, 0-5A, dual channel',
  },
  {
    nama: 'Generator Sinyal',
    deskripsi: 'Function generator untuk menghasilkan berbagai bentuk gelombang',
    gambar: '/GeneratorSinyal.webp',
    jumlahTotal: 6,
    jumlahTersedia: 6,
    spesifikasi: 'Frequency range: 0.1Hz - 20MHz, sine/square/triangle wave',
  },
  {
    nama: 'Jangka Sorong Digital',
    deskripsi: 'Alat ukur presisi untuk pengukuran dimensi',
    gambar: '/JangkaSorong.jpg',
    jumlahTotal: 15,
    jumlahTersedia: 15,
    spesifikasi: 'Range: 0-150mm, akurasi: 0.01mm, digital display',
  },
  {
    nama: 'Mikrometer Sekrup',
    deskripsi: 'Alat ukur presisi tinggi untuk ketebalan dan diameter',
    gambar: '/mikrometer.jpg',
    jumlahTotal: 12,
    jumlahTersedia: 12,
    spesifikasi: 'Range: 0-25mm, akurasi: 0.001mm',
  },
];

async function seedAlat() {
  console.log('Starting alat seeding...');

  try {
    for (const alat of alatData) {
      console.log(`Creating alat: ${alat.nama}`);
      await AlatRepository.create(alat);
      console.log(`✓ ${alat.nama} created`);
    }

    console.log('\n✅ Alat seeding completed successfully!');
    console.log(`Total alat created: ${alatData.length}`);
  } catch (error) {
    console.error('Error seeding alat:', error);
    process.exit(1);
  }
}

// Run the seed
seedAlat();
