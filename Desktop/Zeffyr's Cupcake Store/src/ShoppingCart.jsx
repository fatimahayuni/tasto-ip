import React, { useEffect, useRef, useState } from 'react';
import { useCart } from './CartStore';
import { useJwt } from './UserStore';
import axios from 'axios';

const ShoppingCart = () => {
    const { cart, getCartTotal, modifyQuantity, removeFromCart, setCartContent } = useCart();
    const { getJwt } = useJwt();
    const [isUpdating, setIsUpdating] = useState(false);
    const isFirstRender = useRef(true); // Track first render


    const fetchCart = async () => {
        const jwt = getJwt();
        console.log("JWT used for fetching cart:", jwt)
        try {
            const response = await axios.get(import.meta.env.VITE_API_URL + '/api/cart', {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            console.log('Cart:', response.data);
            setCartContent(response.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    useEffect(() => {
        fetchCart();

    }, []);

    const updateCart = async () => {
        setIsUpdating(true);
        const jwt = getJwt();
        try {
            const updatedCart = cart.map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity
            }));

            await axios.put(import.meta.env.VITE_API_URL + '/api/cart', { cartItems: updatedCart }, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
        } catch (error) {
            console.error('Error updating cart:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return; // Skip the first render
        }
        updateCart();
        return () => { console.log('cleanup') }
    }, [cart]);


    return (
        <div className="container mt-4">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul className="list-group">
                        {cart.map((item) => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <img src={item.imageUrl} alt={item.productName} className="cart-image" width="150px" />
                                    <h5>{item.productName}</h5>
                                    <div className="d-flex align-items-center">

                                        <button className="btn btn-sm btn-secondary me-2" onClick={() => modifyQuantity(item.product_id, item.quantity - 1)} disabled={isUpdating}>-</button>
                                        <p className="mb-0">Quantity: {item.quantity}</p>

                                        <button className="btn btn-sm btn-secondary ms-2" onClick={() => modifyQuantity(item.product_id, item.quantity + 1)} disabled={isUpdating}>+</button>

                                        <button className="btn btn-sm btn-danger ms-2" onClick={() => removeFromCart(item.product_id)} disabled={isUpdating}>Remove</button>
                                    </div>
                                </div>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-3 text-end">
                        <h4>Total: ${getCartTotal()}</h4>
                    </div>
                </>
            )}
        </div>
    );
};

export default ShoppingCart;
