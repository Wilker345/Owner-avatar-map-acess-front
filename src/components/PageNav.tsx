import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./PageNav.module.css";

function PageNav() {
    const { logout, isAuthenticated } = useAuth();

    function handleLogout(){
        logout();
    }

    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink to="/form">Formulário</NavLink>
                </li>
                <li>
                    <NavLink to="/questions/new">Questões</NavLink>
                </li>
                <li>
                    <NavLink to="/answers/new">Respostas</NavLink>
                </li>
                <li>
                    <NavLink to="/orientation/new">Orientações</NavLink>
                </li>
                <li>
                    <NavLink to="/reports">Relatórios</NavLink>
                </li>
            </ul>
            {isAuthenticated && (
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={styles.button} 
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            )}
        </nav>
    );
}

export default PageNav;
