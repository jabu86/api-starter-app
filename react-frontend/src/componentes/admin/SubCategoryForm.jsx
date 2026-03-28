import {useState, useEffect} from "react";

function CategoryForm({initialData , onSubmit ,closeModal, show , errors}) {

    const [form, setForm] = useState({
        name: '',

    });
    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || '',

            });
        }
    }, [initialData]);

    const handleChange = (e) => {

        if (e.target.type === "file") {
            setForm({ ...form, image: e.target.files[0] });
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-1">
                <label htmlFor="name">Category Name</label>
                <input type="text" className={`form-control ${errors.name ? "is-invalid" : ""}`} value={form.name} onChange={handleChange} id="name"
                       placeholder="Brand name"/>
                {errors.name && (<div className="text-danger">{errors.name[0]}</div>)}
            </div>

            <div className="modal-footer mt-3">
                <button type="submit" className="btn btn-primary" >Save</button>
                <button type="button" className="btn btn-danger"
                        onClick={() => closeModal(show)}>Close
                </button>
            </div>
        </form>
    )
}

export default CategoryForm