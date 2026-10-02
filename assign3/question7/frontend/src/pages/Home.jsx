import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";


function Home() {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] = useState([]);


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


    return (

        <div className="container">

            <h1>Shopping Cart</h1>

            <h2>Categories</h2>

            <div className="categories">

                {categories
                    .filter(cat => cat.parent === null)
                    .map(parent => (

                        <div key={parent._id}>

                            <h3>{parent.name}</h3>

                            {categories
                                .filter(
                                    child =>
                                        child.parent === parent._id
                                )
                                .map(child => (

                                    <button
                                        key={child._id}
                                    >
                                        {child.name}
                                    </button>

                                ))}

                        </div>

                    ))}

            </div>


            <h2>Products</h2>

            <div className="products">

                {products.map(product => (

                    <ProductCard
                        key={product._id}
                        product={product}
                    />

                ))}

            </div>

        </div>

    );
}

export default Home;
