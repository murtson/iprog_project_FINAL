import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./notifications.css";
import moment from "moment";

const Notifications = props => {
  const { notifications } = props;
  return (
    <div className="col-lg-6 col-md-12 text-center trades">
      <h2>Notifications!</h2>

      <FontAwesomeIcon
        icon="bell"
        style={{
          fontSize: "50px",
          margin: "10px",
          color: "#F7DC6F"
        }}
      />
      <h5>Here you can see the latest news about the website!</h5>
      {notifications &&
        notifications.map(item => {
          return (
            <ul key={item.id} style={{ color: "#2ECC71" }}>
              <li>
                <span style={{ color: "#E86BE6" }}>{item.user}</span>
                <span style={{ color: "#2ECC71" }}> {item.content}</span>
                <br />
                <span style={{ color: "white" }}>
                  {moment(item.time.toDate()).fromNow()}
                </span>
              </li>
            </ul>
          );
        })}
    </div>
  );
};

export default Notifications;
