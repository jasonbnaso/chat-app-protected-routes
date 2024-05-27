import React, { useState } from "react";
import { useAuthState } from "../../Context/AuthProvider";
import { useChatState } from "../../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import { SideBar } from "../../Misc/SideBar";
import "./chatPage.scss";
import { ChatBox } from "../../Misc/ChatBox";
import { MyChats } from "../../Misc/MyChats";

export const ChatPage = () => {
  const { userInfo } = useAuthState();

  return (
    <div style={{ width: "100%" }}>
      {userInfo && <SideBar />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91vh"
        p="10px"
      >
        {userInfo && <MyChats />}
        {userInfo && <ChatBox />}
      </Box>
    </div>
  );
};
