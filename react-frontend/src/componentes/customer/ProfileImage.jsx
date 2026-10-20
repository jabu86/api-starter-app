function ProfileImage({ imageUrl, imagePreview, user }) {
  return (
    <div className="col-md-4 ">
      <div className="row border justify-content-center text-center shadow p-2">
        {" "}
        <img
          className="rounded-circle border"
          src={`${imagePreview ? imagePreview : imageUrl || "http://localhost:8000/images/profile/profile.png"}`}
          style={{ width: "200px" }}
        />
        <div className="row mt-2">
          <div className="col">
            <h3 class="h5">{user.name}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileImage;
