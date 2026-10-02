import { useState } from "react";

function App() {

    const [page, setPage] = useState("login");

    const [empid, setEmpid] = useState("");
    const [password, setPassword] = useState("");

    const [token, setToken] = useState("");

    const [employee, setEmployee] = useState(null);

    const [date, setDate] = useState("");
    const [reason, setReason] = useState("");
    const [grant, setGrant] = useState("No");

    const [leaves, setLeaves] = useState([]);

    const [message, setMessage] = useState("");


    // -------------------------
    // LOGIN
    // -------------------------

    async function login() {

        const response = await fetch(
            "http://localhost:3000/employee/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    empid: empid,
                    password: password
                })
            }
        );

        const data = await response.json();

        if (data.token) {

            setToken(data.token);

            setPage("home");

        } else {

            setMessage(data.message);

        }

    }


    // -------------------------
    // PROFILE
    // -------------------------

    async function showProfile() {

        const response = await fetch(
            "http://localhost:3000/employee/profile",
            {
                headers: {
                    Authorization: token
                }
            }
        );

        const data = await response.json();

        setEmployee(data);

        setPage("profile");

    }


    // -------------------------
    // ADD LEAVE
    // -------------------------

    async function addLeave() {

        const response = await fetch(
            "http://localhost:3000/employee/leave",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",

                    Authorization: token
                },

                body: JSON.stringify({
                    date: date,
                    reason: reason,
                    grant: grant
                })
            }
        );

        const data = await response.json();

        setMessage(data.message);

        setDate("");
        setReason("");
        setGrant("No");

    }


    // -------------------------
    // LIST LEAVE
    // -------------------------

    async function showLeaves() {

        const response = await fetch(
            "http://localhost:3000/employee/leave",
            {
                headers: {
                    Authorization: token
                }
            }
        );

        const data = await response.json();

        setLeaves(data);

        setPage("leave");

    }


    // -------------------------
    // LOGOUT
    // -------------------------

    function logout() {

        setToken("");

        setEmployee(null);

        setPage("login");

    }


    // =========================
    // LOGIN PAGE
    // =========================

    if (page === "login") {

        return (

            <div>

                <h2>Employee Login</h2>

                <input
                    type="text"
                    placeholder="Employee ID"
                    value={empid}
                    onChange={(e) =>
                        setEmpid(e.target.value)
                    }
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <br /><br />

                <button onClick={login}>
                    Login
                </button>

                <p>{message}</p>

            </div>

        );

    }


    // =========================
    // HOME PAGE
    // =========================

    if (page === "home") {

        return (

            <div>

                <h2>Employee Home</h2>

                <button onClick={showProfile}>
                    Page 1 - Profile
                </button>

                <br /><br />

                <button onClick={showLeaves}>
                    Page 2 - Leave Application
                </button>

                <br /><br />

                <button onClick={logout}>
                    Logout
                </button>

            </div>

        );

    }


    // =========================
    // PROFILE PAGE
    // =========================

    if (page === "profile") {

        return (

            <div>

                <h2>Employee Profile</h2>

                {employee && (

                    <table border="1" cellPadding="10">

                        <tbody>

                            <tr>
                                <td>Employee ID</td>
                                <td>{employee.empid}</td>
                            </tr>

                            <tr>
                                <td>Name</td>
                                <td>{employee.name}</td>
                            </tr>

                            <tr>
                                <td>Email</td>
                                <td>{employee.email}</td>
                            </tr>

                            <tr>
                                <td>Basic Salary</td>
                                <td>{employee.basicsalary}</td>
                            </tr>

                            <tr>
                                <td>HRA</td>
                                <td>{employee.hra}</td>
                            </tr>

                            <tr>
                                <td>DA</td>
                                <td>{employee.da}</td>
                            </tr>

                            <tr>
                                <td>Gross Salary</td>
                                <td>{employee.grosssalary}</td>
                            </tr>

                        </tbody>

                    </table>

                )}

                <br />

                <button onClick={() => setPage("home")}>
                    Home
                </button>

            </div>

        );

    }


    // =========================
    // LEAVE PAGE
    // =========================

    if (page === "leave") {

        return (

            <div>

                <h2>Leave Application</h2>


                <h3>Apply for Leave</h3>


                <label>Date:</label>

                <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                        setDate(e.target.value)
                    }
                />

                <br /><br />


                <label>Reason:</label>

                <input
                    type="text"
                    value={reason}
                    onChange={(e) =>
                        setReason(e.target.value)
                    }
                />

                <br /><br />


                <label>Grant:</label>

                <select
                    value={grant}
                    onChange={(e) =>
                        setGrant(e.target.value)
                    }
                >

                    <option value="Yes">
                        Yes
                    </option>

                    <option value="No">
                        No
                    </option>

                </select>

                <br /><br />


                <button onClick={addLeave}>
                    Add Leave
                </button>


                <p>{message}</p>


                <h3>My Leaves</h3>


                <table border="1" cellPadding="10">

                    <thead>

                        <tr>

                            <th>Date</th>
                            <th>Reason</th>
                            <th>Grant</th>

                        </tr>

                    </thead>


                    <tbody>

                        {leaves.map((leave) => (

                            <tr key={leave._id}>

                                <td>
                                    {leave.date}
                                </td>

                                <td>
                                    {leave.reason}
                                </td>

                                <td>
                                    {leave.grant}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>


                <br />


                <button onClick={() => setPage("home")}>
                    Home
                </button>

            </div>

        );

    }

}

export default App;
