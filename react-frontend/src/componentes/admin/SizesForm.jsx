import {useState, useEffect} from "react";

function ColorsForm({initialData , onSubmit ,closeModal , errors}) {

    const [form, setForm] = useState({
        id:'',
        name: '',
        description: '',

    });
    useEffect(() => {
        if (initialData) {
            setForm({
                id : initialData.id ||'',
                name: initialData.name || '',

            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-1">
                <label htmlFor="name">Color</label>
                <input type="text" className={`form-control ${errors.name ? "is-invalid" : ""}`} value={form.name} onChange={handleChange} name="name"
                       placeholder="Category name"/>
                {errors.name && (<div className="text-danger">{errors.name[0]}</div>)}
            </div>

            <div className="modal-footer mt-3">
                <button type="submit" className="btn btn-primary" >Save</button>
                <button type="button" className="btn btn-danger"
                        onClick={() => closeModal(false)}>Close
                </button>
            </div>
        </form>
    )
}

export default ColorsForm