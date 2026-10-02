import { useEffect, useState } from "react";


function Cart() {

    const [cart, setCart] = useState([]);

    const userId = localStorage.getItem("userId");


    useEffect(() => {

        getCart();

    }, []);


    const getCart = async () => {

        if (!userId) {
            return;
        }

        const response = await fetch(
            `http://localhost:5000/api/users/cart/${userId}`
        );

        const data = await response.json();

        setCart(data);
    };


    const removeProduct = async (productId) => {

        await fetch(
            `http://localhost:5000/api/users/cart/remove/${userId}/${productId}`,
            {
                method: "DELETE"
            }
        );

        getCart();
    };


    const updateQuantity = async (
        productId,
        quantity
    ) => {

        if (quantity < 1) {
            return;
        }

        await fetch(
            "http://localhost:5000/api/users/cart/update",
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    userId,
                    productId,
                    quantity
                })
            }
        );

        getCart();
    };


    let total = 0;

    cart.forEach(item => {

        total +=
            item.product.price *
            item.quantity;

    });


    if (!userId) {

        return (
            <h2>Please login to see your cart</h2>
        );

    }


    return (

        <div className="container">

            <h1>My Cart</h1>

            {cart.map(item => (

                <div
                    className="cart-item"
                    key={item.product._id}
                >

                    <h3>
                        {item.product.name}
                    </h3>

                    <p>
                        Price: ₹{item.product.price}
                    </p>

                    <button
                        onClick={() =>
                            updateQuantity(
                                item.product._id,
                                item.quantity - 1
                            )
                        }
                    >
                        -
                    </button>

                    <span>
                        {" "}{item.quantity}{" "}
                    </span>

                    <button
                        onClick={() =>
                            updateQuantity(
                                item.product._id,
                                item.quantity + 1
                            )
                        }
                    >
                        +
                    </button>

                    <button
                        onClick={() =>
                            removeProduct(
                                item.product._id
                            )
                        }
                    >
                        Remove
                    </button>

                </div>

            ))}

            <h2>
                Total: ₹{total}
            </h2>

        </div>

    );
}

export default Cart;
