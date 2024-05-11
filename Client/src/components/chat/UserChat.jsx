import { useFetchRecipientUser } from "../../hooks";
import PropTypes from "prop-types";
import { Stack } from "react-bootstrap";
import avatar from "../../assets/avatar.svg";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import {unreadNotificationsFunc} from "../../utils/unreadNotifications";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  const { onlineUsers, notifications, markThisUserNotificationsAsRead } = useContext(ChatContext);
  
  const unreadNotifications = unreadNotificationsFunc(notifications);
  const thisUserNotifications = unreadNotifications.filter((n) => {
    return n.senderId == recipientUser?._id;
  });
  const isOnline = onlineUsers.some((user) => user?.userId === recipientUser?._id);

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
      onClick={() => {
        thisUserNotifications.length && markThisUserNotificationsAsRead(thisUserNotifications, notifications);
      }}
    >
      <div className="d-flex">
        <div className="me-2">
          <img src={avatar} alt="profile" height={35}/>
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
          <div className="text">Text Message</div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end">
        <div className="date">
          12/12/2022
        </div>
        {thisUserNotifications.length ? <div className="this-user-notifications">
          {thisUserNotifications.length}
        </div> : null}
        {isOnline && <span className="user-online"></span>}
      </div>
    </Stack>
  );
};

UserChat.propTypes = {
  chat: PropTypes.any,
  user: PropTypes.any,
};

export default UserChat;
