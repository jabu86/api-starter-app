import {useState, useEffect} from "react";

function BrandForm({initialData , onSubmit ,closeModal, show}) {
    const [form, setForm] = useState({
        name: '',
        image: null,
    });
    useEffect(() => {
        if (initialData) {
            setForm({
                name: initialData.name || '',
                image:null,
            });
        }
    }, [initialData]);

    const handleChange = (e) => {

        if (e.target.type === "file") {
            setForm({ ...form, image: e.target.files[0] });
        } else {
            setForm({ ...form, [e.target.id]: e.target.value });
        }
    }
    const handleSubmit = (e) => {

        e.preventDefault();
        onSubmit(form);


    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Product Name</label>
                <input type="text" className="form-control" value={form.name} onChange={handleChange} id="name"
                       placeholder="Brand name"/>
            </div>
            <div className="form-group">
                <label htmlFor="image">Brand Image / Logo</label>
                <div className="custom-file">
                    <input type="file" className="custom-file-input" id="image" onChange={handleChange} id="image" />
                </div>
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

export default BrandForm