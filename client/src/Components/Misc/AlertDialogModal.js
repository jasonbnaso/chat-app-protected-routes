import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

export const AlertDialogModal = ({ handleRemoveUser, userInfo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Leave Group
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg">Leave Group</AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleRemoveUser(userInfo)}
                ml={3}
              >
                Leave Group
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
