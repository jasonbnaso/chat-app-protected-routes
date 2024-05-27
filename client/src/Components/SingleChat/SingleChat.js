import React, { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../../socket.js";
import Lottie from "react-lottie";

import animationData from "../../animations/typing";
import {
  IconButton,
  Text,
  Box,
  Spinner,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useAllToasts } from "../../errorHandling/useAllToasts";
import { useAuthState } from "../Context/AuthProvider";
import { useChatState } from "../Context/ChatProvider";
import { getSenderName, getSenderFull } from "../../config/ChatLogics";
import { UpdateGroupChatModal } from "../Misc/UpdateGroupChatModal";
import { ProfileModal } from "../Misc/ProfileModal";
import { ScrollableChat } from "../Misc/ScrollableChat";
import {
  SEND_MESSAGE_ERROR,
  GET_MESSAGE_ERROR,
} from "../../errorHandling/messages";
import "./singleChat.scss";

export const SingleChat = () => {
  const { errorToast } = useAllToasts();
  const { userInfo } = useAuthState();
  const { selectedChat, setSelectedChat } = useChatState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setloading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [selectedChatCompare, setSelectedChatCompare] = useState([]);
  let isTypingTimeOut;

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setloading(true);

      const { data } = await axios.get(`/api/message/${selectedChat._id}`);
      setMessages(data);
      setloading(false);
      socket.emit("joinChat", selectedChat._id);
    } catch (error) {
      errorToast(GET_MESSAGE_ERROR);
    }
  };

  useEffect(() => {
    socket.emit("setup", userInfo);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => {
      clearTimeout(isTypingTimeOut);
      setIsTyping(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      isTypingTimeOut = setTimeout(() => {
        setIsTyping(false);
      }, 1500);
    });
  }, []);

  useEffect(() => {
    if (!selectedChat) {
      return;
    }
    socket.emit("typing", selectedChat._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage]);

  useEffect(() => {
    fetchMessages();
    setSelectedChatCompare(selectedChat);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedChat]);
  useEffect(() => {
    socket.on("messageReceived", (newMessageReceived) => {
      clearTimeout(isTypingTimeOut);
      setIsTyping(false);
      if (
        !selectedChatCompare ||
        // Check  CURRENT selectedChat is not equal to  the newest messageReceived
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        // Give notification
        //   if (!notification.includes(newMessageReceived)) {
        //     setNotification([newMessageReceived, ...notification]);
        //     setFetchAgain(!fetchAgain);
        //   }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const sendMessage = async (event) => {
    if (event.key === "Enter" && newMessage) {
      try {
        setNewMessage("");

        const { data } = await axios.post("/api/message", {
          content: newMessage,
          chatId: selectedChat._id,
        });
        socket.emit("newMessage", data);
        setMessages([...messages, data]);
      } catch (error) {
        errorToast(SEND_MESSAGE_ERROR);
      }
    }
  };

  const typingHandler = (event) => {
    if (!socketConnected) return;

    setNewMessage(event.target.value);
  };

  return (
    <>
      {selectedChat ? (
        <>
          {" "}
          <Text
            className="chosenChatName"
            pb={3}
            px={2}
            w="100%"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            {/* Display icon "Arrow back" in small screen when a 
            chat is selected to go back to chat list */}
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />

            {!selectedChat.isGroupChat ? (
              <>
                {getSenderName(userInfo, selectedChat.users)}
                <ProfileModal
                  userInfo={getSenderFull(userInfo, selectedChat.users)}
                />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal />
              </>
            )}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
            className="spinnerWrapper"
          >
            {loading ? (
              <Spinner
                size="x1"
                w={10}
                h={10}
                margin="auto"
                className="mySpinner"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
            <>
              <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                {isTyping ? (
                  <Lottie options={defaultOptions} width={60} height={30} />
                ) : (
                  <></>
                )}
                <Input
                  variant="filled"
                  bg="#d5f2f0"
                  placeholder="Message goes here"
                  onChange={typingHandler}
                  value={newMessage}
                />
              </FormControl>
            </>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
        >
          <Text fontSize="3xl" pb={3}>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};
