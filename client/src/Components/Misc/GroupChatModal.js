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
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChatLoading } from "../ChatLoading/ChatLoading";
import { useChatState } from "../Context/ChatProvider";
import { UserBadgeItem } from "../UserAvatar/UserBadgeItem";
import { UserListItem } from "../UserAvatar/UserListItem";
// Custom Toasts Hook
import { useAllToasts } from "../../errorHandling/useAllToasts";
import {
  LOADING_ERROR,
  EMPTY_FIELD,
  GROUP_CHAT_SUCCESS,
  GROUP_CHAT_ERROR,
  USER_ALREADY_ADDED,
} from "../../errorHandling/messages";

export const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { errorToast, successToast, warningToast } = useAllToasts();

  const { chats, setChats } = useChatState();

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      warningToast(USER_ALREADY_ADDED);
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/user?search=${search}`);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      errorToast(LOADING_ERROR);
    }
  };
  const handleDelete = (deleteUser) => {
    setSelectedUsers(
      selectedUsers.filter(
        (selectedUser) => selectedUser._id !== deleteUser._id
      )
    );
  };
  const handleSubmit = async () => {
    setSearch("");
    if (!groupChatName || !selectedUsers) {
      warningToast(EMPTY_FIELD);
      return;
    }
    try {
      const { data } = await axios.post(`/api/chat/group`, {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id)),
      });
      setChats([data, ...chats]);
      onClose();
      successToast(GROUP_CHAT_SUCCESS);
    } catch (error) {
      errorToast(GROUP_CHAT_ERROR);
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" justifyContent="center">
            Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Give chat a name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Friend"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map((otherUsersInfo) => (
                <UserBadgeItem
                  key={otherUsersInfo._id}
                  user={otherUsersInfo}
                  handleFunction={() => handleDelete(otherUsersInfo)}
                />
              ))}
            </Box>
            {loading ? (
              <>
                <ChatLoading />
                <div>Loading...</div>
              </>
            ) : (
              searchResult?.map((otherUsersInfo) => (
                <UserListItem
                  key={otherUsersInfo._id}
                  otherUsersInfo={otherUsersInfo}
                  handleFunction={() => handleGroup(otherUsersInfo)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
