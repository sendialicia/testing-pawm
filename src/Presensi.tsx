import Header from './Header'
import Footer from './Footer'

function Presensi() {
    return (
    <div>

        <div className="page-title"> 
            <h1>Presensi</h1>
        </div>

        <div className="form-presensi">
            <form>
                <div className="judul-form-presensi">
                    <label htmlFor="nama">Nama</label>
                </div>
                <div className="isi-form-presensi">
                    <input type="text" id="nama" name="nama"/>
                </div>
            </form>

            <form>
                <div className="judul-form-presensi">
                    <label htmlFor="nim">NIM</label>
                </div>
                <div className="isi-form-presensi">
                    <input type="text" id="nim" name="nim"/>
                </div>
            </form>

            <form>
                <div className="judul-form-presensi">
                    <label htmlFor="matkul">Mata Kuliah</label>
                </div>
                <div className="isi-form-presensi">
                    <select>
                        <option value = ""> Pilih Mata Kuliah </option>
                        <option value = "re"> Rangkaian Elektrik </option>
                        <option value = "sisdig"> Sistem Digital dan Mikroprosesor</option>
                        <option value = "c"> Pemecahan Masalah dengan C </option>
                        <option value = "eb"> Teknik Biomedis </option>
                        <option value = "sk"> Sistem Kendali </option>
                    </select>
                </div>
            </form>

            <form>
                <div className="judul-form-presensi">
                    <label htmlFor="modul">Modul Praktikum</label>
                </div>
                <div className="isi-form-presensi">
                    <select>
                        <option value = ""> Pilih Modul </option>
                        <option value = "re"> Rangkaian Elektrik </option>
                        <option value = "sisdig"> Sistem Digital dan Mikroprosesor</option>
                        <option value = "c"> Pemecahan Masalah dengan C </option>
                        <option value = "eb"> Teknik Biomedis </option>
                        <option value = "sk"> Sistem Kendali </option>
                    </select>
                </div>
            </form>

            <form>
                <div className="judul-form-presensi">
                    <label htmlFor="tanggal">Tanggal Praktikum</label>
                </div>
                <div className="isi-htmlForm-presensi">
                    <input type="date" id="tanggal" name="tanggal"/>
                </div>
            </form>
        </div>

        <div className="button">
            <button>Kirim</button>
        </div>
    </div>
    )
}


function PresensiPage(){
    return(
        <div>
            <div><Header/></div>
            <div><Presensi/></div>
            <div><Footer/></div>
        </div>
    )
}

export default PresensiPage;