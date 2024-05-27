import React, { useEffect } from "react";
import { useAuthState } from "../Context/AuthProvider";
import { useChatState } from "../Context/ChatProvider";
import { useChats } from "../../hooks/useChats";
import { Text, Box, Button, Stack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { ChatLoading } from "../ChatLoading/ChatLoading";
import { getSenderName } from "../../config/ChatLogics";
import { GroupChatModal } from "./GroupChatModal";
import { useAllToasts } from "../../errorHandling/useAllToasts";
import { LOADING_ERROR } from "../../errorHandling/messages";

export const MyChats = () => {
  const { userInfo } = useAuthState();
  const { errorToast } = useAllToasts();
  const { chatIsLoading, chatLoadingError, chats } = useChats();
  const { selectedChat, setSelectedChat } = useChatState();

  useEffect(() => {
    if (chatLoadingError) {
      errorToast(LOADING_ERROR);
    }
  }, [chatLoadingError]);
  if (chatLoadingError) {
    return null;
  }
  if (chatIsLoading) {
    return <ChatLoading />;
  }

  return (
    <Box
      className="myChats"
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "33%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        {/* My Chats */}
        <svg viewBox="0 0 60 60">
          {" "}
          <g>
            {" "}
            <path fill="none" d="M0 0h24v24H0z" />{" "}
            <path d="M18.574 13.711a.91.91 0 0 0 .898-.898c0-.498-.399-.898-.898-.898s-.898.4-.898.898c0 .5.4.898.898.898zm-4.425 0a.91.91 0 0 0 .898-.898c0-.498-.4-.898-.898-.898-.5 0-.898.4-.898.898 0 .5.399.898.898.898zm6.567 5.04a.347.347 0 0 0-.172.37c0 .048 0 .097.025.147.098.417.294 1.081.294 1.106 0 .073.025.122.025.172a.22.22 0 0 1-.221.22c-.05 0-.074-.024-.123-.048l-1.449-.836a.799.799 0 0 0-.344-.098c-.073 0-.147 0-.196.024-.688.197-1.4.295-2.161.295-3.66 0-6.607-2.457-6.607-5.505 0-3.047 2.947-5.505 6.607-5.505 3.659 0 6.606 2.458 6.606 5.505 0 1.647-.884 3.146-2.284 4.154zM16.673 8.099a9.105 9.105 0 0 0-.28-.005c-4.174 0-7.606 2.86-7.606 6.505 0 .554.08 1.09.228 1.6h-.089a9.963 9.963 0 0 1-2.584-.368c-.074-.025-.148-.025-.222-.025a.832.832 0 0 0-.418.123l-1.748 1.005c-.05.025-.099.05-.148.05a.273.273 0 0 1-.27-.27c0-.074.024-.123.049-.197.024-.024.246-.834.369-1.324 0-.05.024-.123.024-.172a.556.556 0 0 0-.221-.442C2.058 13.376 1 11.586 1 9.598 1 5.945 4.57 3 8.95 3c3.765 0 6.93 2.169 7.723 5.098zm-5.154.418c.573 0 1.026-.477 1.026-1.026 0-.573-.453-1.026-1.026-1.026s-1.026.453-1.026 1.026.453 1.026 1.026 1.026zm-5.26 0c.573 0 1.027-.477 1.027-1.026 0-.573-.454-1.026-1.027-1.026-.572 0-1.026.453-1.026 1.026s.454 1.026 1.026 1.026z" />{" "}
          </g>{" "}
        </svg>
        <GroupChatModal>
          <Button
            // className="customFontSize"
            fontWeight="300"
            display="flex"
            // fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "#507483"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSenderName(userInfo, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        }
      </Box>
    </Box>
  );
};
