import { useEffect, useState } from "react";


function AdminProducts() {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");

    const [price, setPrice] = useState("");

    const [description, setDescription] = useState("");

    const [image, setImage] = useState("");

    const [category, setCategory] = useState("");


    useEffect(() => {

        getProducts();
        getCategories();

    }, []);


    const getProducts = async () => {

        const response = await fetch(
            "http://localhost:5000/api/products"
        );

        const data = await response.json();

        setProducts(data);
    };


    const getCategories = async () => {

        const response = await fetch(
            "http://localhost:5000/api/categories"
        );

        const data = await response.json();

        setCategories(data);
    };


    const addProduct = async () => {

        await fetch(
            "http://localhost:5000/api/products",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    price,
                    image,
                    description,
                    category
                })
            }
        );

        setName("");
        setPrice("");
        setImage("");
        setDescription("");

        getProducts();

        alert("Product added");
    };


    const deleteProduct = async (id) => {

        await fetch(
            `http://localhost:5000/api/products/${id}`,
            {
                method: "DELETE"
            }
        );

        getProducts();
    };


    return (

        <div className="container">

            <h1>Admin Products</h1>


            <input
                placeholder="Product name"
                value={name}
                onChange={e =>
                    setName(e.target.value)
                }
            />


            <input
                placeholder="Price"
                value={price}
                onChange={e =>
                    setPrice(e.target.value)
                }
            />


            <input
                placeholder="Image URL"
                value={image}
                onChange={e =>
                    setImage(e.target.value)
                }
            />


            <input
                placeholder="Description"
                value={description}
                onChange={e =>
                    setDescription(e.target.value)
                }
            />


            <select
                value={category}
                onChange={e =>
                    setCategory(e.target.value)
                }
            >

                <option value="">
                    Select Category
                </option>

                {categories.map(cat => (

                    <option
                        key={cat._id}
                        value={cat._id}
                    >
                        {cat.name}
                    </option>

                ))}

            </select>


            <button onClick={addProduct}>
                Add Product
            </button>


            <h2>Products</h2>

            {products.map(product => (

                <div key={product._id}>

                    <h3>
                        {product.name}
                    </h3>

                    <p>
                        ₹{product.price}
                    </p>

                    <p>
                        Category:
                        {" "}
                        {product.category?.name}
                    </p>

                    <button
                        onClick={() =>
                            deleteProduct(product._id)
                        }
                    >
                        Delete
                    </button>

                </div>

            ))}

        </div>

    );
}

export default AdminProducts;
