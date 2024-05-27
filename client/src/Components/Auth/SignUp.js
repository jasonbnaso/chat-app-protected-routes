import React, { useState } from "react";
import axios from "axios";
import { useAuthState } from "../Context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useAllToasts } from "../../errorHandling/useAllToasts";
import {
  FILE_NOT_RECOGNIZED,
  EMPTY_FIELD,
  UPLOAD_SUCCESS,
  PASSWORD_MATCH_FAIL,
  EMAIL_FAIL,
  REGISTRATION_SUCCESS,
} from "../../errorHandling/messages";

import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";

export const SignUp = () => {
  const { userInfo, setUserInfo } = useAuthState();
  const [name, setName] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmpassword] = useState();
  const [picture, setPicture] = useState();
  const [show, setShow] = useState();
  const [loading, setLoading] = useState();
  const toast = useToast();
  const { successToast, warningToast } = useAllToasts();
  const navigate = useNavigate();

  const handelClick = () => {
    setShow(!show);
  };

  const postDetails = (pictures) => {
    setLoading(true);
    if (pictures === undefined) {
      warningToast(FILE_NOT_RECOGNIZED);
      return;
    }
    // Change to axios
    if (pictures.type === "image/jpeg" || pictures.type === "image/png") {
      const data = new FormData();
      data.append("file", pictures);
      data.append("upload_preset", "ChatApp");
      data.append("cloud_name", "duptfaof6");
      fetch("https://api.cloudinary.com/v1_1/duptfaof6/image/upload", {
        method: "post",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          setPicture(data.url.toString());
          setLoading(false);
          successToast(UPLOAD_SUCCESS);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      warningToast(FILE_NOT_RECOGNIZED);
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmPassword) {
      warningToast(EMPTY_FIELD);
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      warningToast(PASSWORD_MATCH_FAIL);
      setLoading(false);
      return;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      warningToast(EMAIL_FAIL);
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post("/api/user", {
        name,
        email,
        password,
        picture,
      });
      setUserInfo(data);
      successToast(REGISTRATION_SUCCESS);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
  };

  return (
    <VStack spacing={4} valign="stretch">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="emailSignUp" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="passwordSignUp" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handelClick}>{show ? "Hide" : "Show"}</Button>
        </InputGroup>
      </FormControl>

      <FormControl id="confirmPassword" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <Button onClick={handelClick}>{show ? "Hide" : "Show"}</Button>
        </InputGroup>
      </FormControl>
      <FormControl id="picture">
        <FormLabel>Upload picture</FormLabel>
        <Input
          type="file"
          placeholder="Add picture"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        backgroundColor="#507483"
        width="100%"
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};
