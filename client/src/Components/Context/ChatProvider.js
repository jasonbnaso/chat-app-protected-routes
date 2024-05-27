import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [notification, setNotification] = useState([]);

  return (
    <>
      <ChatContext.Provider
        value={{
          selectedChat,
          setSelectedChat,
          notification,
          setNotification,
        }}
      >
        {children}
      </ChatContext.Provider>
    </>
  );
};

export const useChatState = () => {
  return useContext(ChatContext);
};

export function useChatContext() {
  const chatContext = useContext(ChatContext);

  if (chatContext === undefined) {
    throw new Error("Chat context needs to be used within chat provider");
  }
  return chatContext;
}
