import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  FormControl,
  Box,
  Text,
  Tooltip,
  Menu,
  MenuButton,
  MenuDivider,
  MenuList,
  MenuItem,
  Button,
  Avatar,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Spinner,
} from "@chakra-ui/react";

import { ProfileModal } from "./ProfileModal";
import { useChatState } from "../Context/ChatProvider";
import { useAuthState } from "../Context/AuthProvider";
import { ChatLoading } from "../ChatLoading/ChatLoading";
import { UserListItem } from "../UserAvatar/UserListItem";
import { useAllToasts } from "../../errorHandling/useAllToasts";
import {
  USER_NOT_FOUND,
  LOG_OUT_SUCCESS,
  LOADING_CHAT_ERROR,
  LOADING_ERROR,
} from "../../errorHandling/messages";
// import { showNotFoundError } from "../../errorHandling/useMyToasts";
// import { NotificationBadge } from "react-notification-badge";
// import { Effect } from "react-notification-badge";
// import { getSender } from "../../config/ChatLogics";

export const SideBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { errorToast, successToast, warningToast } = useAllToasts();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userInfo } = useAuthState();
  const { setSelectedChat, notification, setNotification, chats, setChats } =
    useChatState();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    successToast(LOG_OUT_SUCCESS);
    navigate("/");
  };
  // This is the search in the side bar to the left for all users
  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.get(`/api/user?search=${search}`);

      if (data.length === 0) {
        warningToast(USER_NOT_FOUND);
        return;
      }
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      errorToast(LOADING_ERROR);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);

      const { data } = await axios.post(`/api/chat`, { userId });
      if (!chats.find((chat) => chat._id === data._id))
        setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      errorToast(LOADING_CHAT_ERROR);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        border="none"
        w="100%"
        padding="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users To Chat" hasArrow placement="bottom-end">
          {/* colorScheme="teal" was added in to this button */}
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>
        <div className="userProfile">
          <Menu>
            <MenuButton p={2}>
              <BellIcon fontSize="2xl" m={1} />
              <MenuList>{!notification.length && "No Notifiction"}</MenuList>
            </MenuButton>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={userInfo.name}
                src={userInfo.picture}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal userInfo={userInfo}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
          <Drawer />
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search User</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <FormControl>
                <Input
                  placeholder="Friend"
                  mb={1}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </FormControl>
              {/* <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                // onChange={(e) => setSearch(e.target.value)}
                onChange={(e) => handleSearch(e.target.value)}
                
              />
              <Button onClick={handleSearch}>Go</Button> */}
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              // searchResult?.map((userInfo) => ( ???
              searchResult?.map((otherUsersInfo) => {
                return (
                  <UserListItem
                    key={otherUsersInfo._id}
                    otherUsersInfo={otherUsersInfo}
                    handleFunction={() => accessChat(otherUsersInfo._id)}
                  />
                );
              })
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
