import { useState } from "react";

import { useNavigate } from "react-router-dom";


function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const register = async (e) => {

        e.preventDefault();

        const response = await fetch(
            "http://localhost:5000/api/users/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        alert(data.message);

        if (data.message === "Registration successful") {
            navigate("/login");
        }
    };


    return (

        <div className="form">

            <h2>Register</h2>

            <form onSubmit={register}>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button type="submit">
                    Register
                </button>

            </form>

        </div>

    );
}

export default Register;
