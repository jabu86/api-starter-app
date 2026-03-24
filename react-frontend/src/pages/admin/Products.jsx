import {useEffect, useState} from 'react'
import ProductList from '../../componentes/admin/ProductList.jsx'
import Modal from '../../componentes/admin/Modal.jsx'
import ProductForm from '../../componentes/admin/ProductForm.jsx'
import Swal from "sweetalert2";


function Products({openModal ,show}) {
    // const [show, setShow] = useState(false);
    const [products, setProducts] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});

    const getProducts = async () =>{
       try {
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
       }catch(err){
           console.log(err)
       }
    }
    const getBrands = async () =>{
        try {
            const res = await fetch(`/api/admin/brands`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            setBrands(data.brands);
        }catch(err){
            console.log(err);
        }
    }

    const getCategories = async () =>{
        try {
            const res = await fetch(`/api/admin/categories`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // console.log("Response",res)
            const data = await res.json();
            // console.log("API RESPONSE:", data.products);
            setCategories(data.categories);
        }catch(err){
            console.log(err);
        }
    }

    const getSubCategories = async () =>{
        try {
            const res = await fetch(`/api/admin/sub-categories`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // console.log("Response",res)
            const data = await res.json();
            // console.log("API RESPONSE:", data.products);
            setSubCategories(data.subCategory);
        }catch(err){
            console.log(err)
        }
    }
    const getSize = async () =>{
       try {
           const res = await fetch(`/api/admin/size`,{
               method: "GET",
               headers: {
                   "Content-Type": "application/json",
               },
           });
           // console.log("Response",res)
           const data = await res.json();
           // console.log("API RESPONSE:", data.products);
           setSizes(data.sizes);
       }catch(err){
           console.log(err);
       }
    }
    const getColors = async () =>{
        try {
            const res = await fetch(`/api/admin/colors`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // console.log("Response",res)
            const data = await res.json();
            // console.log("API RESPONSE:", data.products);
            setColors(data.colors);
        }catch(err){
            console.log(err);
        }

    }

    useEffect(() => {
        getBrands();
        getProducts();
        getCategories();
        getSubCategories();
        getSize();
        getColors();
    },[]);

    const handleAddProduct = async e =>{
        setErrors({});
        openModal(show)
        setIsEditing(false);
        setSelectedProducts(null);

    }
    const handleUpdateProduct = async product =>{
        setErrors({});
        openModal(show)
        setIsEditing(true);
        setSelectedProducts(product);

    }

    const handleSaveProducts = async (form) =>{
        setErrors({});
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("brand_id", form.brand);
        formData.append("category_id", form.categoryId);
        formData.append("description", form.description)
        formData.append("price", form.price);
        formData.append("quantity", form.quantity);
        formData.append("in_stock", form.in_stock);
        formData.append("active", form.active);
        formData.append("colors", form.colors);
        formData.append("size", form.sizes);
        form.newImages.forEach((file) => {
            formData.append("images", file); // ✅ correct
        });
        form.existingImages.forEach((file) => {
            formData.append("images[]", file); // ✅ correct
        });

        formData.append("active_image_index",JSON.stringify(form.activeImage));
        try {
            let url = isEditing ? `/api/admin/products/${form.id}` : `/api/admin/products`;
            let payload = {
                method: "POST",
                body:formData,
            }


            const res = await fetch(url,payload);
            const data = await res.json();
            if(res.status === 400 && data.errors){
                const groupedErrors = data.errors.reduce((acc, err) =>{
                    if(!acc[err.path]){
                        acc[err.path] = [];
                    }
                    acc[err.path].push(err.msg);
                    return acc;
                },{})
                setErrors(groupedErrors || {});
                return;
            }
            if(data.success){
                setErrors({});
                openModal(show);
                getProducts();
                await Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                }).fire({
                    icon: "success",
                    title: data.message,
                });
            }
        }catch(err){
            console.log(err);
        }

    }

    const handleDelete = async (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            const res = await fetch(`/api/admin/products/${id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if(data.success){
                getProducts();
            }
            if (data.success) Swal.fire({
                title: "Deleted!",
                text: data.message,
                icon: "success"
            });
        });
    }

    const handleDeleteImage = async id => {
        alert("Are you sure?" +id);
    }



    return (
        <div className="row g-0 mt-1 p-3" >
            <div className="col-md-12">
                <button className="btn btn-danger float-end" onClick={() => handleAddProduct()}>Add Product</button>
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
                        <ProductList products={products} handleUpdateProduct={handleUpdateProduct} handleDelete={handleDelete}/>
                    </tbody>

                </table>

                {show && (
                    <Modal openModal={openModal} show={show} title={isEditing ? "Edit Product" : "Add Product"} closeModal={() => openModal(show)} onSave={handleSaveProducts}>
                        <ProductForm
                            initialData={selectedProducts}
                            onSubmit={handleSaveProducts }
                            show={show}
                            closeModal={() => openModal(show)}
                            errors={errors}
                            categories={categories}
                            subCategories={subCategories}
                            brands={brands}
                            sizes={sizes}
                            colors={colors}
                            handleDeleteImage={handleDeleteImage}
                        />
                    </Modal>
                )}


            </div>
        </div>
    )
}



export default Products;
