import { Link } from "react-router-dom";
const Header = () => {
    return(
       <header>
            <nav>
                <Link to='/'><img src="./images/logo.png" width='100px'/></Link>
            </nav>
       </header> 
    );
}

export default Header;