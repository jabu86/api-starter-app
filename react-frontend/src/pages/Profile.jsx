import { useEffect, useState } from "react";
import ProfileUserForm from "../componentes/customer/ProfileUserForm";
import ProfileResetPassword from "../componentes/customer/ProfileResetPassword";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import OrderListHistory from "../componentes/customer/OrderListHistory";
import { useAuth } from "../context/AuthContext.jsx";

function Profile() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState("");
  const [userOrders, setUserOrders] = useState([]);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile: {
      bio: "",
      image: "",
    },
  });

  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getUserProfile = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch(`/api/admin/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Request faild: ${res.status}`);
      }
      const data = await res.json();
      // console.log(data.user.profile.image);
      const staticImageUrl = `http://localhost:8000/images/profile/profile.png`;

      setImageUrl(
        data.user.profile == null
          ? staticImageUrl
          : `http://localhost:8000/images/${data?.user?.profile.image}`,
      );

      setUser(data.user);
    } catch (error) {
      console.log("Error fetching profile: ", error);
    }
  };

  const getUserOrders = async () => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch(`/api/user/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Request faild: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        setUserOrders(data.orders);
      }
    } catch (error) {
      console.log("Error fetching profile: ", error);
    }
  };

  const handleUpdateUserInfo = async (form) => {
    if (!token) {
      console.log("No token found");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("bio", form.bio);
    formData.append("image", form.image);
    try {
      let url = `/api/admin/profile`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (res.status === 400 && data.errors) {
        const groupedErrors = data.errors.reduce((acc, err) => {
          if (!acc[err.path]) {
            acc[err.path] = [];
          }
          acc[err.path].push(err.msg);
          return acc;
        }, {});
        setErrors(groupedErrors || {});
        return;
      }
      if (res.ok) {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const handleResetPassword = async (form) => {
    const payload = {
      password: form.password,
      confirmPassword: form.confirmPassword,
    };

    try {
      const res = await fetch(`/api/admin/profile-reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      //Display error messages
      if (res.status === 400 && data.errors) {
        const groupedErrors = data.errors.reduce((acc, err) => {
          if (!acc[err.path]) {
            acc[err.path] = [];
          }
          acc[err.path].push(err.msg);
          return acc;
        }, {});
        setErrors(groupedErrors || {});
        return;
      }
      if (res.ok) {
        form.password = "";
        form.confirmPassword = "";
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  const handleDeleteUserProfile = async (user_id) => {
    try {
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await fetch(`/api/admin/profile/user/${user_id}/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error(`Request faild: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          theme: "colored",
        });
        handleLogout();
      }
    } catch (error) {
      console.log("Error fetching profile: ", error);
    }
  };

  useEffect(() => {
    getUserProfile();
    getUserOrders();
  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <div className="row gap-2 mb-4">
        <ProfileUserForm
          onSubmit={handleUpdateUserInfo}
          user={user}
          errors={errors}
          imageUrl={imageUrl}
        />
        <div className="col">
          <OrderListHistory orders={userOrders} />
          <div className="row mt-4 gap-2">
            <ProfileResetPassword
              onSubmit={handleResetPassword}
              user={user}
              errors={errors}
            />
            <div className="col shadow border p-2">
              <h2>Delete User</h2>
              <div className="row m-0">
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteUserProfile(user.id)}
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
