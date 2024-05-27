import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../../config/ChatLogics";
import { useAuthState } from "../Context/AuthProvider";

export const ScrollableChat = ({ messages }) => {
  const { userInfo } = useAuthState();
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, i) => (
          <div style={{ display: "flex" }} key={message._id}>
            {(isSameSender(messages, message, i, userInfo._id) ||
              isLastMessage(messages, i, userInfo._id)) && (
              <Tooltip
                label={message.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={message.sender.name}
                  src={message.sender.picture}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  message.sender._id === userInfo._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(
                  messages,
                  message,
                  i,
                  userInfo._id
                ),
                marginTop: isSameUser(messages, message, i, userInfo._id)
                  ? 3
                  : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {message.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

// Jest and react testing library
