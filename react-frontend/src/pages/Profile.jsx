import { useEffect, useState } from "react";
import ProfileUserForm from "../componentes/customer/ProfileUserForm";
import ProfileResetPassword from "../componentes/customer/ProfileResetPassword";
import { toast } from "react-toastify";
function Profile() {
  const token = localStorage.getItem("token");
  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState("");
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

  const getUserProfile = async () => {
    try {
      if (!token) {
        console.log("No token found");
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

  // console.log(user);

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
      console.log(error)
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
          form.password = ""
          form.confirmPassword = ""
          toast.success(data.message);

        }
    } catch (error) {
      toast.error(error);
      console.log(error)
    }

  };

  useEffect(() => {
    getUserProfile();
  }, []);

  if (!user) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
    <h1>Profile of {user.name}</h1>
      <div className="row justify-content-center">     
        <ProfileUserForm
          onSubmit={handleUpdateUserInfo}
          user={user}
          errors={errors}
          imageUrl={imageUrl}
        />
        <ProfileResetPassword
          onSubmit={handleResetPassword}
          user={user}
          errors={errors}
        />
      </div>
    </>
  );
}

export default Profile;
