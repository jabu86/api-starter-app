import {useEffect, useState} from 'react'
import ProductList from '../../componentes/admin/ProductList.jsx'
import Modal from '../../componentes/admin/Modal.jsx'

// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'


function Products({openModal ,show}) {


    // const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const getProducts = async () =>{
        const res = await fetch(`/api/admin/products`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        // console.log("Response",res)
        const data = await res.json();
        // console.log("API RESPONSE:", data.products);
        setProducts(data.products);
    }

    useEffect(() => {
        getProducts();
    },[]);
    // console.log(products);

    const handleSaveProducts = async (e) =>{
        alert('saving products' );
        openModal(show);
    }
    return (
        <div className="row g-0 mt-1 p-3" >
            <div className="col-12 mb-1">
                <button className="btn btn-danger float-end" onClick={() => openModal(show)}>Add Product</button>
                <h2>Products</h2>
                <table className="table table-responsive mt-4">
                    <caption>List of products</caption>
                    <thead>
                    <tr>
                        <th>TITLE</th>
                        <th>CATEGORY</th>
                        <th>BRAND</th>
                        <th>PRICE</th>
                        <th>QUANTITY</th>
                        <th>IMAGES</th>
                        <th>IN STOCK</th>
                        <th>ACTIVE</th>
                        <th className="text-center">ACTION</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        <ProductList products={products} />
                    </tbody>

                </table>

                {show && (
                    <Modal openModal={openModal} show={show} title="Add Product" closeModal={() => openModal(show)} onSave={handleSaveProducts}>
                        <div className="form-group">
                            <label htmlFor="name">Product Name</label>
                            <input type="text" className="form-control" id="name"
                                   placeholder="Product name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="brand">Brand</label>
                            <select className="form-control" id="brand">
                                <option>1</option>
                                <option>2</option>

                            </select>
                        </div>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="categories">Categories</label>
                                <select className="form-control" id="categories">
                                    <option>1</option>
                                    <option>2</option>

                                </select>
                            </div>
                            <div className="col">
                                <label htmlFor="sub-categories">Sub Categories</label>
                                <select className="form-control" id="sub-categories">
                                    <option>1</option>
                                    <option>2</option>

                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input type="text" className="form-control" id="price"
                                   placeholder="Product price"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="quantity">Product Quantity</label>
                            <input type="number" min="0" className="form-control" id="name"
                                   placeholder="Product quantity"/>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <div className="form-check">
                                    <input className="form-check-input position-static" type="checkbox"
                                           id="in-stock" name="in-stock" value="option1"/>
                                    <label className="form-check-label" htmlFor="in-stock">In Stock</label>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="form-check">
                                    <input className="form-check-input position-static" type="radio"
                                           name="active" id="active" value="option1"/>
                                    <label className="form-check-label" htmlFor="active">Active</label>
                                </div>
                            </div>
                        </div>
                    </Modal>
                )}


            </div>
        </div>
    )
}



export default Products;
