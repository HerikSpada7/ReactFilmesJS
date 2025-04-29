import "./Header.css";
import Logo from "../../assets/img/logo.svg"
const Header = () => {
    return(
        <header>
            <div className="layout_grid cabecalho">

               <img src={Logo} alt="logo da filmoteca" />

            <nav className="nav_header">
                <a className="link_header" href="">Filmes</a>
                <a className="link_header" href="">Gênero</a>
            </nav>  
            </div>
            {/* mo rolê pra esse negocio vei, seloko*/}
        </header>
    )
}
export default Header;