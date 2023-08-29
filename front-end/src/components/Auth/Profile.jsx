import React from 'react';

const Profile = ({ user }) => {
  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      <p>Join Date: {user.joinDate}</p>
    </div>
  );
};

export default Profile;
