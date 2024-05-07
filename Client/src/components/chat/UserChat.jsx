import { useFetchRecipientUser } from "../../hooks";
import PropTypes from "prop-types";
import { Stack } from "react-bootstrap";
import avatar from "../../assets/avatar.svg";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="user-card align-items-center p-2 justify-content-between"
      role="button"
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
        <div className="this-user-notifications">2</div>
        <span className="user-online"></span>
      </div>
    </Stack>
  );
};

UserChat.propTypes = {
  chat: PropTypes.any,
  user: PropTypes.any,
};

export default UserChat;
