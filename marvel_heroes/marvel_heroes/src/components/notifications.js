import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./notifications.css";

const Notifications = props => {
  const { notifications } = props;

  return (
    <div className="col-lg-6 col-md-12 text-center trades">
      <h2>Notifications!</h2>

      <FontAwesomeIcon
        icon="bell"
        style={{
          fontSize: "50px",
          margin: "25px",
          color: "#F7DC6F"
        }}
      />
      <h5>Here you can see the latest news about the website!</h5>
      {notifications &&
        notifications.map(item => {
          return (
            <h5 key={item.id}>
              <span style={{ color: "pink" }}>{item.user}</span>
              <span>{item.content}</span>
            </h5>
          );
        })}
    </div>
  );
};

export default Notifications;
