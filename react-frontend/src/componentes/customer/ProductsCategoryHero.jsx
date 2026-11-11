import React from 'react'
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

function ProductsCategoryHero({categories, addToCart, isLoading}) {

    
  return (
        <div>
            
            {categories.map((category) => (
                <section key={category.id} className="product-section">
                    <div className="product-section-header">
                        <h3>{category.name}</h3>

                        <Link to={`/shop?category=${encodeURIComponent(category.name)}`}>
                            View all
                        </Link>
                    </div>

                    <div className="row">                         
                        {category.products.length === 0 ? ('') : (<ProductCard products={category?.products} addToCart={addToCart} isLoading={isLoading}/>)}
                    </div>
                </section>
            ))}
        </div>
    );
}

export default ProductsCategoryHero