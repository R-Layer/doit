import React from "react";

const Profile = props => {
  const { user } = props;
  if (user) {
    return <div>{user.username}</div>;
  } else {
    return <div>No user selected</div>;
  }
};
export default Profile;
