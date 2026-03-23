import {useState, useEffect} from "react";

function ProductForm(
    {
        initialData ,
        onSubmit ,
        closeModal,
        show ,
        errors,
        categories,
        subCategories,
        brands,
        colors,
        sizes
    }){

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [form, setForm] = useState({
        id:'',
        name: '',
        brand: '',
        price: 0,
        quantity: 0,
        description: '',
        image: null,
        categoryId: '',
        subCategoryId: '',
        colors:[],
        sizes: [],
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                id : initialData.id || '',
                name: initialData.name || '',
                brand: initialData.brand.id || '',
                price: initialData.price || '',
                quantity: initialData.quantity || '',
                description: initialData.description || '',
                categoryId: initialData.category.id || '',
                subCategoryId: initialData.subCategory?.id || '',
                color: initialData.subCategory?.color || '',
                size: initialData.brand.size || '',
                in_stock: initialData.in_stock || false,
                active:initialData.active || false,
                colors:initialData.colors?.map(color => color.id) || [],
                sizes:initialData.sizes?.map(size => size.id) || [],
                image:null,
            });
            const foundCategory = categories.find(
                c => c.id === initialData.category.id
            );

            setSelectedCategory(foundCategory);
        }
    }, [initialData , categories]);

    const handleChange = (e) => {
        const { name, type, checked, value, files } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "file"
                        ? files[0]
                        : value
        }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    }

    const handleChangeCategories = (e) => {
        const categoryId = Number( e.target.value);
        const foundSubCategories = categories.find(category => category.id == categoryId);
        setSelectedCategory(foundSubCategories);
        // setForm({ ...form, categoryId: categoryId, subCategoryId: null });
        setForm((prev) => ({
            ...prev,
            categoryId,
            subCategoryId: '' // reset subcategory
        }));
    }


    const handleChangeSubCategories = (e) => {
        const subCategoryId = Number( e.target.value);
        // setForm({ ...form, subCategoryId: subCategoryId });

        setForm((prev) => ({
            ...prev,
            subCategoryId
        }));
    }

    const handleMultiSelect = (e) => {
    const {name, options} = e.target;

    const values = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
        setForm((prev) => ({
            ...prev,
            [name]: values
        }));
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
                <label htmlFor="name"><strong>Product Name</strong></label>
                <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Product name" onChange={handleChange}  value={form.name}/>
                {errors.name && (<div className="text-danger">{errors.name[0]}</div>)}
            </div>
            <div className="form-group mb-2">
                <label htmlFor="brand"><strong>Brand</strong></label>
                <select
                    className={`form-control ${errors.brand_id ? "is-invalid" : ""}`}
                    name="brand" value={form.brand}
                    onChange={handleChange}
                >
                    {brands && brands.map(brand => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                </select>
                {errors.brand_id && (<div className="text-danger">{errors.brand_id[0]}</div>)}
            </div>
            <div className="row mb-2">
                <div className="col">
                    <label><strong>Categories</strong></label>
                    <select
                        className={`form-control ${errors.category_id ? "is-invalid" : ""}`}
                        name="category"
                        onChange={handleChangeCategories}
                        value={form.categoryId}>
                        <option value="" disabled>Select Category</option>
                        {categories && categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    {errors.category_id && (<div className="text-danger">{errors.category_id[0]}</div>)}
                </div>
                <div className="col">
                    <label><strong>Sub Categories</strong></label>
                    <select
                        className="form-control"
                        name="subCategoryId"
                        value={form.subCategoryId}
                        onChange={handleChangeSubCategories}
                    >
                        <option value="">Select Subcategory</option>
                        {selectedCategory?.subCategory?.map(sub => (
                            <option key={sub.id} value={sub.id}>
                                {sub.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="row mb-2">
                <div className="col">
                    <label><strong>Colors</strong></label>
                    <select className="form-control" name="colors" multiple value={form.colors} onChange={handleMultiSelect} >
                        <option value="" disabled>Select Color</option>
                        {colors && colors.map(color => (
                            <option key={color.id} value={color.id}>{color.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col">
                    <label><strong>Sizes</strong></label>
                    <select className="form-control" name="sizes" multiple value={form.sizes} onChange={handleMultiSelect} >
                        <option value="" disabled>Select Size</option>
                        {sizes && sizes.map(size => (
                            <option key={size.id} value={size.id}>{size.size}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-group mb-2">
                <label ><strong>Price</strong></label>
                <input type="text" className={`form-control ${errors.quantity ? "is-invalid" : ""}`} name="price"
                       placeholder="Product price" value={form.price}  onChange={handleChange}/>
                {errors.price && (<div className="text-danger">{errors.price[0]}</div>)}
            </div>

            <div className="form-group mb-2">
                <label><strong>Product Quantity</strong></label>
                <input type="number" min="0" className={`form-control ${errors.quantity ? "is-invalid" : ""}`} name="quantity"
                       placeholder="Product quantity" value={form.quantity} onChange={handleChange}/>
                {errors.quantity && (<div className="text-danger">{errors.quantity[0]}</div>)}
            </div>
            <div className="form-group mb-2">
                <label ><strong>Description</strong></label>
                <textarea
                    className={`form-control ${errors.brand_id ? "is-invalid" : ""}`}
                    name="description"
                    placeholder="Enter Description"
                    rows={5} onChange={handleChange}
                    value={form.description}/>
                {errors.description && (<div className="text-danger">{errors.description[0]}</div>)}
            </div>

            <div className="row mb-2">
                <div className="col-3">
                    <div className="form-check">
                        <input
                            className="form-check-input position-static"
                            type="checkbox"
                            name="in_stock"
                            checked={form.in_stock}
                            onChange={handleChange}
                        />
                        <label className="form-check-label"><strong>In Stock</strong></label>
                    </div>
                </div>
                <div className="col-3">
                    <div className="form-check">
                        <input
                            className="form-check-input position-static"
                            type="checkbox"
                            name="active"
                            checked={form.active}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" ><strong>Active</strong></label>
                    </div>
                </div>

            </div>
            <div className="modal-footer mt-2">
                <button type="submit" className="btn btn-primary" >Save</button>
                <button type="button" className="btn btn-danger"
                        onClick={() => closeModal(show)}>Close
                </button>
            </div>
        </form>
    )
}

export default ProductForm