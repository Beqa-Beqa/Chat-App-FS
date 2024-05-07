import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, getRequest, postRequest } from "../utils/services";
import PropTypes from "prop-types";

export const ChatContext = createContext();

const ChatContextProvider = ({children, user}) => {
  const [userChats, setUserChats] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [userChatsError, setUserChatsError] = useState(null);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessageError, setSendTextMessageError] = useState(null);
  const [newMessage, setNewMessage] = useState(null);

  useEffect(() => {
    const getUsers = async() => {
      const response = await getRequest(`${baseUrl}/users`);
      if(response.error) return console.log("Error fetching users", response);

      const pChats = response.filter((u) => {
        if(user._id === u._id) return false;
        
        let isChatCreated = false;

        if(userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });

      setPotentialChats(pChats);
    }

    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async() => {
      if(user?._id) {
        setUserChatsError(null);
        setIsUserChatsLoading(true);

        const response = await getRequest(`${baseUrl}/chats/${user._id}`);

        setIsUserChatsLoading(false);

        if(response.error) return setUserChatsError(response);

        setUserChats(response);
      }
    }

    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async() => {
      setMessagesError(null);
      setIsMessagesLoading(true);

      const response = await getRequest(`${baseUrl}/messages/${currentChat?._id}`);

      setIsMessagesLoading(false);

      if(response.error) return setMessagesError(response);

      setMessages(response);
    }

    getMessages();
  }, [currentChat]);

  const sendTextMessage = useCallback(async(textMessage, sender, currentChatId, setTextMessage) => {
    if(!textMessage) return;
    const response = await postRequest(`${baseUrl}/messages`, JSON.stringify({
      chatId: currentChatId,
      senderId: sender._id,
      text: textMessage
    }));

    if(response.error) return setSendTextMessageError(response);

    setNewMessage(response);
    setMessages((prev) => [...prev, response]);
    setTextMessage("");
  }, []);

  const updateCurrentChat = useCallback((chat) => {
    setCurrentChat(chat);
  }, []);

  const createChat = useCallback(async(firstId, secondId) => {
    const response = await postRequest(`${baseUrl}/chats`, JSON.stringify({firstId, secondId}));

    if(response.error) return console.log("Error creating chat", response);

    setUserChats((prev) => [...prev, response]);
  }, []);

  return <ChatContext.Provider value={{
    userChats,
    isUserChatsLoading,
    userChatsError,
    potentialChats,
    createChat,
    currentChat,
    updateCurrentChat,
    messages,
    isMessagesLoading,
    messagesError,
    sendTextMessage
  }}>
    {children}
  </ChatContext.Provider>
}

ChatContextProvider.propTypes = {
  children: PropTypes.any,
  user: PropTypes.any
}

export default ChatContextProvider;