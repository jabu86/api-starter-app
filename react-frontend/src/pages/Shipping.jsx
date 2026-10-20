import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ShippingForm from "../componentes/customer/ShippingForm";
import ShippingList from "../componentes/customer/ShippingList";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CheckoutStep from "../componentes/customer/CheckoutStep";
function Shipping() {
  const navigate = useNavigate();
  // const [userShippingAddress, setUserShippingAddress] = useState({});
  const [shippingAddress, setShippingAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [errors, setErrors] = useState({});
  const [initialData, setInitialData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const shippingFormRef = useRef(null);

  const getUserShippingAddress = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }
      const { data } = await axios.get("/api/shipping", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Find the address marked as default
      const defaultAddress = data.shippingAddress?.find(
        (address) => address.is_default === true,
      );
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      }
      setShippingAddress(data);
    } catch (error) {
      console.log(error);
      console.error(
        "Failed to fetch shipping address:",
        error.response?.data || error,
      );
    }
  };

  // console.log(errors);

  const addShippingAddress = async (form) => {
    let url = "";
    if (isEditing) {
      url = `/api/shipping/${form.id}/edit`;
    } else {
      url = `/api/shipping/`;
    }

    const payload = {
     
      address: form.address_one,
      address_2: form.address_two,
      city: form.city,
      province: form.province,
      postal_code: form.code,
      country: form.country,
    };
    setErrors({});
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const { data } = await axios.post(
        url,
        payload, //request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (data.success) {
        getUserShippingAddress();
        setIsEditing(false);
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
        // Clear the child form
        shippingFormRef.current?.resetForm();
        setErrors({});
      }
    } catch (error) {
      // console.log(error.response.data.errors , 'eeeeeeee');

      if (error.response.status === 400 && error.response.data.errors) {
        const groupedErrors = error.response.data.errors.reduce((acc, err) => {
          if (!acc[err.path]) {
            acc[err.path] = [];
          }
          acc[err.path].push(err.msg);
          return acc;
        }, {});
        setErrors(groupedErrors || {});
        return;
      }
      if (error.response.status === 404 && error.response.data.message) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 8000,
          closeOnClick: true,
          theme: "colored",
        });
        // Clear the child form
        shippingFormRef.current?.resetForm();
      }
      console.error(
        "Failed to fetch shipping address:",
        error.response || error,
      );
    }
  };

  const handleSelectAddress = async (address) => {
    try {
      setSelectedAddress(address);
      const url = `/api/shipping/${address.id}/update`;
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const { data } = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        getUserShippingAddress();
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
      }
    } catch (error) {
      if (error.response.status === 404 && error.response.data.message) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 8000,
          closeOnClick: true,
          theme: "colored",
        });
      }
      console.error(
        "Failed to fetch shipping address:",
        error.response || error,
      );
    }
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    if (!selectedAddress) {
      return;
    }
    const url = `/api/shipping/checkout`;
    const token = localStorage.getItem("token");
    try {
      if (!token) {
        console.log("No token found");
        return;
      }
      const { data } = await axios.post(url, selectedAddress, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (data.success) {
        console.log(data.url);

        // Move to the next checkout step
        navigate(`${data.url}`);
      }
    } catch (error) {
      console.log(error);
    }
    // console.log("Selected address:", selectedAddress);
  };

  const handleEditShippingAddress = (edit) => {
    setInitialData(edit);
    setIsEditing(true);
    // console.log(edit);
  };

  const handleDeleteShippingAddress = async (id) => {
    const url = `/api/shipping/${id}/delete`;
    const token = localStorage.getItem("token");
    setErrors({});
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      const { data } = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (data.success) {
        // If the deleted address was selected for checkout
        if (selectedAddress?.id === id) {
          setSelectedAddress(null);
        }
        getUserShippingAddress();
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
        setErrors({});
      } else {
        toast.error(data.message || "Failed to delete shipping address.", {
          position: "top-right",
          autoClose: 8000,
          closeOnClick: true,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete shipping address.",
        {
          position: "top-right",
          autoClose: 8000,
          closeOnClick: true,
          theme: "colored",
        },
      );
    }
  };

  useEffect(() => {

    
    getUserShippingAddress();
  }, []);

  return (
    <div className="row mb-5">
      <div className="col-md-12 ">
        <CheckoutStep step1 step2 />
        <div className="row p-4 gap-2 justify-content-center mt-4">
          <div className="col-md-4 mb-4 mb-md-0 p-3 border rounded shadow-sm">
            {isEditing ? <h2>Edit Address</h2> : <h2>Add Address</h2>}
            <ShippingForm
              addShippingAddress={addShippingAddress}
              initialData={initialData}
              errors={errors}
              isEditing={isEditing}
              ref={shippingFormRef}
            />
          </div>
          <div className="col border p-3 rounded shadow-sm">
            <h2>Addresses</h2>
            {!shippingAddress.hasAddress ? (
              <div className="alert alert-danger">
                {shippingAddress.message}
              </div>
            ) : (
              <div className="table-responsive-sm">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th className="bg-info text-center">Choose address</th>
                      <th>Address One</th>
                      <th>Address Two</th>
                      <th>City</th>
                      <th>Province</th>
                      <th>Postal Code</th>
                      <th colSpan={2} className="text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <ShippingList
                      shipping={shippingAddress?.shippingAddress}
                      selectedAddress={selectedAddress}
                      onSelectAddress={handleSelectAddress}
                      handleEditShippingAddress={handleEditShippingAddress}
                      handleDeleteShippingAddress={handleDeleteShippingAddress}
                    />
                  </tbody>
                </table>
                <button
                  type="submit"
                  className="btn btn-primary float-end"
                  disabled={!selectedAddress}
                  onClick={handleContinue}
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
