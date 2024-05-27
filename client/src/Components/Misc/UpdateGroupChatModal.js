import React from "react";
import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  IconButton,
  Spinner,
  Center,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useAuthState } from "../Context/AuthProvider";
import { useChatState } from "../Context/ChatProvider";
import { useChats } from "../../hooks/useChats";
import { UserBadgeItem } from "../UserAvatar/UserBadgeItem";
import { UserListItem } from "../UserAvatar/UserListItem";
import { AlertDialogModal } from "./AlertDialogModal";
import { useAllToasts } from "../../errorHandling/useAllToasts";
import {
  USER_ALREADY_ADDED,
  ADMIN_ERROR,
  LOADING_ERROR,
} from "../../errorHandling/messages";

export const UpdateGroupChatModal = () => {
  const { refetch } = useChats();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const { errorToast } = useAllToasts();
  const toast = useToast();

  const { userInfo } = useAuthState();
  const { selectedChat, setSelectedChat } = useChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user?search=${query}`);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      errorToast(LOADING_ERROR);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const { data } = await axios.put(`/api/chat/rename`, {
        chatId: selectedChat._id,
        chatName: groupChatName,
      });

      setSelectedChat(data);
      refetch();
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      errorToast(USER_ALREADY_ADDED);
      return;
    }

    if (selectedChat.groupAdmin._id !== userInfo._id) {
      errorToast(ADMIN_ERROR);
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.put(`/api/chat/groupadd`, {
        chatId: selectedChat._id,
        userId: user1._id,
      });

      setSelectedChat(data);
      refetch();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemoveUser = async (user1) => {
    if (
      selectedChat.groupAdmin._id !== userInfo._id &&
      user1._id !== userInfo._id
    ) {
      errorToast(ADMIN_ERROR);
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.put(`/api/chat/groupremove`, {
        chatId: selectedChat._id,
        userId: user1._id,
      });

      user1._id === userInfo._id ? setSelectedChat() : setSelectedChat(data);
      refetch();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="35px" display="flex" justifyContent="center">
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemoveUser(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl display="flex">
              <Input
                placeholder="Add user to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  otherUsersInfo={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Center>
              {/* <Button
              onClick={() => handleRemoveUser(userInfo)}
              colorScheme="red"
            >
              Leave Group
            </Button> */}
              <AlertDialogModal
                userInfo={userInfo}
                handleRemoveUser={handleRemoveUser}
              />
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
