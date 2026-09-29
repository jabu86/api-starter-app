import { useEffect, useState , useRef } from "react";
import axios from "axios";
import ShippingForm from "../componentes/customer/ShippingForm";
import ShippingList from "../componentes/customer/ShippingList";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

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
        console.log("No token found");
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
      first_name: form.first_name,
      last_name: form.last_name,
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
        console.log("No token found");
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
        console.log("No token found");
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
      // console.log(error);
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

  const handleContinue = (e) => {
    e.preventDefault();
    if (!selectedAddress) {
      return;
    }
    navigate("/checkout");
    // Move to the next checkout step
    console.log("Selected address:", selectedAddress);
  };

  const handleEditShippingAddress = (edit) => {
    setInitialData(edit);
    setIsEditing(true);
    // console.log(edit);
  };

  const handleDeleteShippingAddress = async (id) => {
    try {
      const url = `/api/shipping/${id}/delete`;
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("No token found");
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
      console.log(error);
    }
  };

  useEffect(() => {
    getUserShippingAddress();
  }, []);
  return (
    <div className="row mb-2 justify-content-center mb-5">
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-4">
             {isEditing ? <h1>Edit Address</h1> :<h1>Add Address</h1> }
            <ShippingForm
              addShippingAddress={addShippingAddress}
              initialData={initialData}
              errors={errors}
              isEditing={isEditing}
                ref={shippingFormRef}
            />
          </div>
          <div className="col-md-8">

            
            <h1>Shipping Addresses</h1>
            {!shippingAddress.hasAddress ? (
              <div className="alert alert-danger">
                {shippingAddress.message}
              </div>
            ) : (
              <div className="table-responsive-sm">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Select Address</th>
                      <th>Name</th>
                      <th>Surname</th>
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
                  Checkout
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
