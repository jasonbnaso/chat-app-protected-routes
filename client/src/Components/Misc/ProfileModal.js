import { ViewIcon } from "@chakra-ui/icons";
import { theme } from "../theme/index.js";
import "./misc.scss";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";

export const ProfileModal = ({ userInfo, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
          h="auto"
          fontSize={{ base: "26px", md: "28px" }}
          borderTopRadius="xl"
          borderBottomRadius="xl"
          color="#000"
        >
          <ModalHeader
            display="flex"
            alignContent="center"
            justifyContent="center"
            borderTopRadius="xl"
            background={theme.colors.lightest}
          >
            {userInfo.name}'s Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            background={theme.colors.lightest}
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
            spacing="10px"
          >
            <Text m={2}>User Name: {userInfo.name}</Text>
            <Image
              m={2}
              boxSize="100px"
              borderRadius="full"
              src={userInfo.picture}
              alt={userInfo.name}
            />
            <Text m={2}>Email: {userInfo.email}</Text>
          </ModalBody>
          <ModalFooter
            background={theme.colors.lightest}
            borderBottomRadius="xl"
          ></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
