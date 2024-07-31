import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./Login.module.css";
import {Box, Button, Container, TextField, Typography} from "@mui/material"

export default function Login() {
    // PRE-FILL FOR DEV PURPOSES
    const [email, setEmail] = useState("t3es11t32e21e@gmail.com");
    const [password, setPassword] = useState("P@ssw0rd");

    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();

        if (email && password) login(email, password);
    }

    useEffect(
        function () {
            if (isAuthenticated) navigate("/form", { replace: true });
        },
        [isAuthenticated, navigate]
    );

    return (
        <main className={styles.login}>
            <Container maxWidth="sm">
                <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Login
                    </Typography>
                    <TextField
                        fullWidth
                        label="Email"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{mt: 2}}>
                        Login
                    </Button>
                </Box>
            </Container>
        </main>
    );
}

