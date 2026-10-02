import { useState } from "react";

import { useNavigate } from "react-router-dom";


function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const login = async (e) => {

        e.preventDefault();

        const response = await fetch(
            "http://localhost:5000/api/users/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        alert(data.message);

        if (data.user) {

            localStorage.setItem(
                "userId",
                data.user.id
            );

            localStorage.setItem(
                "role",
                data.user.role
            );

            if (data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
        }
    };


    return (

        <div className="form">

            <h2>Login</h2>

            <form onSubmit={login}>

                <input
                    type="email"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>

    );
}

export default Login;

