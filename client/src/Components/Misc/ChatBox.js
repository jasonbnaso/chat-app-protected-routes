import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { socket } from "../../socket.js";
import { useChatState } from "../Context/ChatProvider";
import { SingleChat } from "../SingleChat/SingleChat";

export const ChatBox = () => {
  const { selectedChat, notification, setNotification } = useChatState();

  useEffect(() => {
    socket.on("messageReceived", (newMessageReceived) => {
      console.log(
        "Selected Chat Chat box after  message received",
        selectedChat
      );
      // console.log("here!!!!!!!!", newMessageReceived);
      // if (
      //   !selectedChatCompare ||
      //   // Check  CURRENT selectedChat is not equal to  the newest messageReceived
      //   selectedChatCompare._id !== newMessageReceived.chat._id
      // ) {
      //   // Give notification
      //   //   if (!notification.includes(newMessageReceived)) {
      //   //     setNotification([newMessageReceived, ...notification]);
      // useChats to fetch chats now
      //   //     setFetchAgain(!fetchAgain);
      //   //   }
      // } else {
      //   setMessages([...messages, newMessageReceived]);
      // }
    });
  });
  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat />
    </Box>
  );
};
