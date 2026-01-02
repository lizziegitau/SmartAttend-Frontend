// src/pages/parent/Profile.jsx
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [profilePic, setProfilePic] = useState(null);

  // Redirect to login if not logged in
  if (!user) return <Navigate to="/" />;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => setProfilePic(null);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Profile</h2>

      <div style={{ border: "1px solid #ccc", padding: 20, maxWidth: 400 }}>
        <div style={{ marginBottom: 20 }}>
          <img
            src={profilePic || "/default-avatar.png"}
            alt="Profile"
            style={{ width: 100, height: 100, borderRadius: "50%" }}
          />
          <div>
            <label style={{ cursor: "pointer", marginRight: 10 }}>
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </label>
            {profilePic && (
              <button onClick={handleRemoveImage}>Remove</button>
            )}
          </div>
        </div>

        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
      </div>
    </div>
  );
};

export default Profile;
