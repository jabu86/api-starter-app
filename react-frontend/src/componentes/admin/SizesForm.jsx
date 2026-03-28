import {useState, useEffect} from "react";

function SizesForm({initialData , onSubmit ,closeModal , errors}) {

    const [form, setForm] = useState({
        id:'',
        size: '',

    });
    useEffect(() => {
        if (initialData) {
            setForm({
                id : initialData.id ||'',
                size: initialData.size || '',

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
                <label htmlFor="name">Size</label>
                <input type="text" className={`form-control ${errors.size ? "is-invalid" : ""}`} value={form.size} onChange={handleChange} name="size"
                       placeholder="Size"/>
                {errors.size && (<div className="text-danger">{errors.size[0]}</div>)}
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

export default SizesForm