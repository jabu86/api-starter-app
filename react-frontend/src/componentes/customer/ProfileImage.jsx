

function ProfileImage({imageUrl , imagePreview}) {

  return (
      <div 
          className="image-container mb-2"
          style={{
             backgroundImage: `url(${imagePreview? imagePreview : imageUrl || "http://localhost:8000/images/profile/profile.png"})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "50vh",
            borderImageoutset: " 10px",
          }}

        ></div>
  );
}

export default ProfileImage;
