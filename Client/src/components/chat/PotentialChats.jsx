import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

  return (
    <div className="all-users">
      {potentialChats &&
        potentialChats.map((u, index) => {
          return (
            <div
              key={index}
              className="single-user"
              onClick={() => createChat(user._id, u._id)}
            >
              {u.name}
              {onlineUsers?.some((user) => user.userId === u?._id) &&
                <span className={"user-online"} />
              }
            </div>
          );
        })}
    </div>
  );
};

export default PotentialChats;
