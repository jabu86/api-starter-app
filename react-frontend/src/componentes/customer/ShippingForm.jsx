import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

const ShippingForm = forwardRef( ({ addShippingAddress, initialData, errors, isEditing }, ref) => {
  const initialForm = {
    first_name: "",
    last_name: "",
    address_one: "",
    address_two: "",
    city: "",
    province: "",
    code: "",
    country: "",
  };
 
  const [form, setForm] = useState(initialForm);

   // Expose resetForm() to the parent
  useImperativeHandle(ref, () => ({
    resetForm() {
      setForm(initialForm);
    },
  }));
  

  useEffect(() => {
    if (initialData) {
      setForm({
        id: initialData.id || "",
        first_name: initialData.first_name || "",
        last_name: initialData.last_name || "",
        address_one: initialData.address || "",
        address_two: initialData.address_2 || "",
        city: initialData.city || "",
        province: initialData.province || "",
        code: initialData.postal_code || "",
        country: initialData.country || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addShippingAddress(form);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
              id="first_name"
              placeholder="First name"
              value={form.first_name}
              onChange={handleChange}
            />
            {errors.first_name && (
              <div className="text-danger">{errors.first_name[0]}</div>
            )}
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
              id="last_name"
              placeholder="Last name"
              value={form.last_name}
              onChange={handleChange}
            />
            {errors.last_name && (
              <div className="text-danger">{errors.last_name[0]}</div>
            )}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            id="address_one"
            placeholder="1234 Main St"
            value={form.address_one}
            onChange={handleChange}
          />
          {errors.address && (
            <div className="text-danger">{errors.address[0]}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="address_two">Address2</label>
          <input
            type="text"
            className="form-control"
            id="address_two"
            placeholder="Apartment, studio, or floor"
            value={form.address_two}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className={`form-control ${errors.city ? "is-invalid" : ""}`}
            id="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
          />
          {errors.city && <div className="text-danger">{errors.city[0]}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="province">Province</label>
          <input
            type="text"
            className={`form-control ${errors.province ? "is-invalid" : ""}`}
            id="province"
            placeholder="Province"
            value={form.province}
            onChange={handleChange}
          />
          {errors.province && (
            <div className="text-danger">{errors.province[0]}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="code">Postal Code</label>
          <input
            type="text"
            className={`form-control ${errors.postal_code ? "is-invalid" : ""}`}
            id="code"
            placeholder="Code"
            value={form.code}
            onChange={handleChange}
          />
          {errors.postal_code && (
            <div className="text-danger">{errors.postal_code[0]}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            className={`form-control ${errors.country ? "is-invalid" : ""}`}
            id="country"
            placeholder="country"
            value={form.country}
            onChange={handleChange}
          />
          {errors.country && (
            <div className="text-danger">{errors.country[0]}</div>
          )}
        </div>
        <div className="form-group text-end">
          {isEditing ? (
            <button type="submit" className="btn btn-primary mt-2 mb-2">
              Update
            </button>
          ) : (
            <button type="submit" className="btn btn-primary mt-2 mb-2">
              Save
            </button>
          )}
        </div>
      </form>
    </div>
  );
})

export default ShippingForm;
