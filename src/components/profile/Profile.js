import React from "react";

export default function Profile(props) {
  let imageSource = props.user.fetch.data
    ? props.user.fetch.data[7].avatarPath
    : "";
  let user = props.user.fetch.data
    ? props.user.fetch.data[7]
    : { contacts: [] };
  console.log(props.user);
  return (
    <div>
      <div className="tile">
        <div className="tile-icon">
          <figure className="avatar avatar-lg">
            <img src={imageSource} alt="Avatar" />
          </figure>
        </div>
        <div className="tile-content">
          <p className="tile-title">{user.username}</p>
          <p className="tile-subtitle text-gray">{user.email}</p>
          <ul>
            <li>{user.timezone}</li>
            <li>
              <span>Work hours: </span>
              <span>
                {user.from} - {user.to}
              </span>{" "}
            </li>
            <li>{user.days}</li>
            <li>
              {user.contacts.map(contact => (
                <p key={contact.key}>{contact.value}</p>
              ))}
            </li>
          </ul>
        </div>
      </div>
      <button onClick={props.loadUser}>Load stuff</button>
    </div>
  );
}
