// import {Link, useNavigate} from "react-router-dom";
// import {useAuth} from "../../context/AuthContext.jsx";
import { useState, useEffect } from "react";
import ProfileImage from '../customer/ProfileImage'
function ProfileUserForm({ onSubmit, user  , errors , imageUrl}) {
  // console.log(user.profile.bio);
  const [imagePreview, setImagePreview] = useState("");
  
  const [form, setForm] = useState({
    id: "",
    name: "",
    email: "",
    bio: "",
    image:null
  });
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {    
        const file = files[0];
        setForm((prev) => ({
          ...prev,
          image:file
        }));
        if(file){
          setImagePreview(URL.createObjectURL(file));
        }
    } else{

      setForm((prev) =>({
        ...prev,
         [name]: value
      }));
    }
    
  };

  useEffect(() => {
    if (user) {
      setForm({
        id: user.id || "",
        name: user.name || "",
        email: user.email || "",
        bio: user?.profile?.bio || "",
        image:null
      });
    }
  }, [user]);

  useEffect(() => {
  return () => {
    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
  };
}, [imagePreview]);

  const handleUpdateUserInfo = (e) => {
    e.preventDefault(); 
    onSubmit(form);
  };


  return (
    <>
    <ProfileImage imageUrl={imageUrl} imagePreview={imagePreview}/>
    
    <div className="col-md-6">     
     
      <form onSubmit={handleUpdateUserInfo}>
        <h2>User Infomation</h2>
        <div className="form-group mb-2">
          <label htmlFor="name">
            <strong>Name</strong>
          </label>
          <input
            type="text"
            name="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && (<div className="text-danger">{errors.name[0]}</div>)}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="email">
            <strong>Email Address</strong>
          </label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (<div className="text-danger">{errors.email[0]}</div>)}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="bio">
            <strong>Bio</strong>
          </label>
          <textarea
            name="bio"
            className="form-control"
            rows={5}
            onChange={handleChange}
            value={form.bio}
          ></textarea>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="image">
            <strong>Image</strong>
            <input type="file" className="form-control" id="image" name="image"  onChange={handleChange}/>
          </label>
        </div>
        <div>
          <button type="submit" className="btn btn-primary btn-lg mt-2">
            Update
          </button>
        </div>
      </form>
    </div>
    </>
  );
}

export default ProfileUserForm;
