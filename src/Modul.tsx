import Header from './Header'
import Footer from './Footer'

function Modul() {
    return (
        <div>
            <div className="page-title"> 
                <h1>Praktikum Teknik Biomedis</h1>
            </div>

            <div className="modul-wrap">
                <div className="daftar-modul">
                    <h3>Semester 3</h3>
                    <div className="button-modul">
                        <a href="#">Rangkaian Elektrik</a>
                    </div>
                    <div className="button-modul">
                        <a href="#">Sistem Digital dan Mikroprosesor</a>
                    </div>
                </div>

                <div className="daftar-modul">
                    <h3>Semester 4</h3>
                    <div className="button-modul">
                        <a href="#">Pemecahan Masalah dengan C</a>
                    </div>
                    <div className="button-modul">
                        <a href="#">Teknik Biomedis</a>
                    </div>
                </div>

                <div className="daftar-modul">
                    <h3>Semester 6</h3>
                    <div className="button-modul">
                        <a href="#">Sistem Kendali</a>
                    </div>
                </div>

            </div>
        </div>
    )
}

function NavPresensi() {
    return (<div className="page-title"> 
        <h1>Presensi</h1>

        <div className="go-to-presensi">
            <a href='#'>Isi Presensi</a>
        </div>
    </div>)
}

function ModulPage() {
    return (<div>
        <div><Header/></div>
        <div><Modul/></div>
        <div><NavPresensi/></div>
        <div><Footer/></div>
    </div>)
}
export default ModulPage;