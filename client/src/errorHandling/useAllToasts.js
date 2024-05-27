import { useToast } from "@chakra-ui/react";

export function useAllToasts() {
  const toast = useToast();

  function successToast({ title, description }) {
    toast({
      title: title,
      description: description,
      status: "success",
      duration: 3500,
      isClosable: true,
      position: "top",
    });
  }

  function errorToast({ title, description }) {
    toast({
      title: title,
      description: description,
      status: "error",
      duration: 3500,
      isClosable: true,
      position: "top",
    });
  }

  function warningToast({ title, description }) {
    toast({
      title: title,
      description: description,
      status: "warning",
      duration: 3500,
      isClosable: true,
      position: "top",
    });
  }
  function infoToast({ title, description }) {
    toast({
      title: title,
      description: description,
      status: "info",
      duration: 3500,
      isClosable: true,
      position: "top",
    });
  }

  return { toast, successToast, errorToast, warningToast, infoToast };
}
