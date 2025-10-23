import logoBlack from './assets/logo-black.png'
import logoItb from './assets/logo-itb.png'      

function Footer() {
    return (<footer>
        <img src = {logoBlack}/>
        <div className="footer">© 2025 clients. All Rights Reserved.</div>
        <img src={logoItb}/>
    </footer>)
}

export default Footer;