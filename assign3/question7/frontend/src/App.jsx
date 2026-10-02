import { useEffect, useState } from "react";

function App() {

    const [students, setStudents] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    const [editId, setEditId] = useState(null);


    // GET STUDENTS
    const getStudents = async () => {

        const response = await fetch(
            "http://localhost:3000/students"
        );

        const data = await response.json();

        setStudents(data);
    };


    // ADD / UPDATE
    const saveStudent = async () => {

        if (editId === null) {

            // ADD
            await fetch(
                "http://localhost:3000/students",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        age: age
                    })
                }
            );

        } else {

            // UPDATE
            await fetch(
                `http://localhost:3000/students/${editId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        name: name,
                        email: email,
                        age: age
                    })
                }
            );

            setEditId(null);
        }


        setName("");
        setEmail("");
        setAge("");

        getStudents();
    };


    // DELETE
    const deleteStudent = async (id) => {

        await fetch(
            `http://localhost:3000/students/${id}`,
            {
                method: "DELETE"
            }
        );

        getStudents();
    };


    // EDIT
    const editStudent = (student) => {

        setEditId(student.id);

        setName(student.name);
        setEmail(student.email);
        setAge(student.age);
    };


    // GET DATA WHEN PAGE LOADS
    useEffect(() => {

        getStudents();

    }, []);


    return (
        <div>

            <h1>Student CRUD</h1>


            <h2>
                {editId === null
                    ? "Add Student"
                    : "Update Student"}
            </h2>


            <input
                placeholder="Name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <br />
            <br />


            <input
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <br />
            <br />


            <input
                placeholder="Age"
                type="number"
                value={age}
                onChange={(e) =>
                    setAge(e.target.value)
                }
            />

            <br />
            <br />


            <button onClick={saveStudent}>

                {editId === null
                    ? "Add Student"
                    : "Update Student"}

            </button>


            <hr />


            <h2>Student List</h2>


            {students.map((student) => (

                <div key={student.id}>

                    <p>
                        <b>ID:</b> {student.id}
                    </p>

                    <p>
                        <b>Name:</b> {student.name}
                    </p>

                    <p>
                        <b>Email:</b> {student.email}
                    </p>

                    <p>
                        <b>Age:</b> {student.age}
                    </p>


                    <button
                        onClick={() =>
                            editStudent(student)
                        }
                    >
                        Edit
                    </button>


                    <button
                        onClick={() =>
                            deleteStudent(student.id)
                        }
                    >
                        Delete
                    </button>

                    <hr />

                </div>

            ))}

        </div>
    );
}

export default App;