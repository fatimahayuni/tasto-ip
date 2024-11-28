import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function ProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
                setProducts(response.data);
                console.log("response", response)
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Our Products</h1>
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-4 mb-4">
                        <ProductCard
                            id={product.id}
                            imageUrl={product.image}
                            productName={product.name}
                            price={product.price.toFixed(2)}
                            description={product.description}

                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsPage;