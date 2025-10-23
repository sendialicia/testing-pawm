import logo from './assets/logo.png'
import profileIcon from './assets/profile-icon.png'

function Header() {
    return (
    <header>
        <div className="navbar">
            <h1 className="logo"><img src={logo}/></h1>
            <nav>
                <a href="#">Peminjaman Lab</a>
                <a href="#">Peminjaman Alat</a>
                <a href="#">Praktikum</a>
                <a href="#">Aturan Lab</a>
                <a href="#" className="profile"><img src={profileIcon}/></a>
            </nav>
        </div>
    </header>)
}

export default Header;