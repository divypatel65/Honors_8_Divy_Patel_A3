import { useEffect, useState } from "react";


function Admin() {

    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");

    const [parent, setParent] = useState("");


    useEffect(() => {

        getCategories();

    }, []);


    const getCategories = async () => {

        const response = await fetch(
            "http://localhost:5000/api/categories"
        );

        const data = await response.json();

        setCategories(data);
    };


    const addCategory = async () => {

        if (!name) {
            alert("Enter category name");
            return;
        }

        await fetch(
            "http://localhost:5000/api/categories",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    parent
                })
            }
        );

        setName("");

        setParent("");

        getCategories();
    };


    const deleteCategory = async (id) => {

        await fetch(
            `http://localhost:5000/api/categories/${id}`,
            {
                method: "DELETE"
            }
        );

        getCategories();
    };


    return (

        <div className="container">

            <h1>Admin Panel</h1>

            <h2>Add Category</h2>

            <input
                placeholder="Category name"
                value={name}
                onChange={e =>
                    setName(e.target.value)
                }
            />


            <select
                value={parent}
                onChange={e =>
                    setParent(e.target.value)
                }
            >

                <option value="">
                    Main Category
                </option>

                {categories
                    .filter(cat => cat.parent === null)
                    .map(cat => (

                        <option
                            key={cat._id}
                            value={cat._id}
                        >
                            {cat.name}
                        </option>

                    ))}

            </select>


            <button onClick={addCategory}>
                Add Category
            </button>


            <h2>Categories</h2>

            {categories.map(cat => (

                <div key={cat._id}>

                    <span>
                        {cat.name}
                    </span>

                    <button
                        onClick={() =>
                            deleteCategory(cat._id)
                        }
                    >
                        Delete
                    </button>

                </div>

            ))}

        </div>

    );
}

export default Admin;
