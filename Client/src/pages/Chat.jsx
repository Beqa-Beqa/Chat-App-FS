import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap";
import { UserChat, PotentialChats, ChatBox } from "../components";
import { AuthContext } from "../context/AuthContext";

const Chat = () => {
  const { userChats, isUserChatsLoading, updateCurrentChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  return ( 
    <Container>
      <PotentialChats />
      {userChats?.length ? 
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Loading chats...</p>}
            {userChats?.map((chat, index) => {
              return (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user}/>
                </div>
              );
            })}
          </Stack>
          <ChatBox />
        </Stack>
      : null}
    </Container>
  );
}
 
export default Chat;