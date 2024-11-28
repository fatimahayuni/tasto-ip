import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function HomePage() {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const response = await axios.get('/featured.json');
                setFeaturedProducts(response.data);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            }
        };

        fetchFeaturedProducts();
    }, []);

    const renderFeaturedProducts = () => {
        const productElements = [];
        for (const product of featuredProducts) {
            productElements.push(
                <div key={product.id} className="col-md-3 mb-4">
                    <ProductCard
                        id={product.id}
                        imageUrl={product.image}
                        productName={product.name}
                        price={product.price.toFixed(2)}
                    />
                </div>
            );
        }
        return productElements;
    };
    return (
        <>
            <header>
                <div className="header-content">
                    <h1>Welcome to Zeffyr's Cupcakes Store</h1>
                    <p>Your sweet escape to delicious cupcakes</p>
                    <a href="#" className="btn btn-light btn-lg">Shop Now</a>

                </div>
            </header>

            <main className="container my-5">
                <h2 className="text-center mb-4">Featured Products</h2>

                {/* Product Cards Here */}
                <div className="row">
                    {renderFeaturedProducts()}
                </div>
            </main>
        </>
    )
}

export default HomePage;