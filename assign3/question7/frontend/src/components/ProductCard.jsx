function ProductCard({ product }) {

    const addToCart = async () => {

        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("Please login first");
            return;
        }

        await fetch(
            "http://localhost:5000/api/users/cart/add",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    userId: userId,
                    productId: product._id
                })
            }
        );

        alert("Product added to cart");
    };


    return (

        <div className="product">

            <img
                src={product.image}
                alt={product.name}
            />

            <h3>{product.name}</h3>

            <p>{product.description}</p>

            <h4>₹{product.price}</h4>

            <button onClick={addToCart}>
                Add to Cart
            </button>

        </div>

    );
}

export default ProductCard;

