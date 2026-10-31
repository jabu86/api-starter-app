import {useState, useEffect} from "react";

function UserForm({initialData , onSubmit ,closeModal , errors , roles}) {

    const [form, setForm] = useState({
        id:'',
        role: '',
    });
    useEffect(() => {
        if (initialData) {
            setForm({
                id : initialData.id ||'',
                role: initialData.roles?.[0]?.id?.toString() || '',
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
                <label htmlFor="name">Select Role</label>
                {/*<input type="text" className={`form-control ${errors.name ? "is-invalid" : ""}`} value={form.name} onChange={handleChange} name="name"*/}
                {/*       placeholder="Category name"/>*/}
                {/*{errors.name && (<div className="text-danger">{errors.name[0]}</div>)}*/}
                <select id="role"  name="role" value={form.role} onChange={handleChange} className="form-control">
                    <option value="" disabled>Select Role</option>
                    {roles.map((role) => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                </select>
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

export default UserForm