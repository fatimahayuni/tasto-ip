import { atom, useAtom } from 'jotai';
import Immutable from "seamless-immutable";


// Define the initial state of the cart. We put in one piece of test data
const initialCart = Immutable([])

// Create an atom for the cart
export const cartAtom = atom(initialCart);

// Custom hook for cart operations
export const useCart = () => {
    const [cart, setCart] = useAtom(cartAtom);

    // Function to calculate the total price of items in the cart
    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const addToCart = (product) => {
        setCart((currentCart) => {
            const existingItemIndex = currentCart.findIndex(item => item.product_id === product.id);
            if (existingItemIndex !== -1) {
                // Use setIn to update quantity immutably
                const currentQuantity = currentCart[existingItemIndex].quantity;
                return currentCart.setIn([existingItemIndex, 'quantity'], currentQuantity + 1);
            } else {
                // Use concat to add a new item immutably
                return currentCart.concat({ ...product, product_id: product.id, quantity: 1 });
            }
        });
    };

    const modifyQuantity = (product_id, quantity) => {
        setCart((currentCart) => {
            const existingItemIndex = currentCart.findIndex(item => item.product_id === product_id);
            if (existingItemIndex !== -1) {

                // check if the quantity will be reduced to 0 or less, if so remove the item
                if (quantity < 0) {
                    return currentCart.filter(item => item.product_id !== product_id);
                } else {
                    return currentCart.setIn([existingItemIndex, 'quantity'], quantity);
                }

            }
        });
    }

    const removeFromCart = (product_id) => {
        setCart((currentCart) => {
            return currentCart.filter(item => item.product_id !== product_id);
        });
    }

    const setCartContent = (cartItems) => {
        setCart(Immutable(cartItems));
    }


    return {
        cart,
        getCartTotal,
        addToCart,
        modifyQuantity,
        removeFromCart,
        setCartContent
    };
};