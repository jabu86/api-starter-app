import React from 'react'
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

function ProductsCategoryHero({categories}) {
    console.log(categories);
    
  return (
        <div>
            
            {categories.map((category) => (
                <section key={category.id} className="product-section">
                    <div className="product-section-header">
                        <h3>{category.name}</h3>

                        <Link to={`/shop?category=${category.id}`}>
                            View all
                        </Link>
                    </div>

                    <div className="row">                         
                        {category.products.length === 0 ? ('') : (<ProductCard products={category?.products} />)}
                    </div>
                </section>
            ))}
        </div>
    );
}

export default ProductsCategoryHero