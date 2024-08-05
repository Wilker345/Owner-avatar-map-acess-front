import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import {Button} from "@mui/material";
import {useAuth} from "@/contexts/AuthContext";

function PageNav() {
    const { logout, isAuthenticated } = useAuth();

    function handleLogout(){
        logout()
    }
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to="/form">Formulário</NavLink>
                </li>
                <li>
                    <NavLink to="/formResponses">Avaliações</NavLink>
                </li>
                <li>
                    <Button variant="contained" color="primary" sx={{mt: 2}} onClick={() => {
                       handleLogout()
                    }}>Logout</Button>
                </li>
            </ul>
        </nav>
    );
}

export default PageNav;
