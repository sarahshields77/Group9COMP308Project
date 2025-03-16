import React from "react";
import { Link } from "react-router-dom";

function ProfilePage() {
  return (
    <div className="container text-center mt-5">
      <h1>Your Profile</h1>
      <p>Personalized settings and activity history will go here.</p>
      <Link to="/community">
        <button className="btn btn-primary">Back to Community Hub</button>
      </Link>
    </div>
  );
}

export default ProfilePage;
