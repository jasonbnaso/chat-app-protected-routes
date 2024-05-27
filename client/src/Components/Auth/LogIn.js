import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAllToasts } from "../../errorHandling/useAllToasts";
import { useAuthState } from "../Context/AuthProvider";
import {
  EMPTY_FIELD,
  WRONG_PW_OR_USER,
  LOG_IN_SUCCESS,
} from "../../errorHandling/messages";

import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  VStack,
  Button,
} from "@chakra-ui/react";

export const LogIn = () => {
  const { userInfo, setUserInfo } = useAuthState();
  const [show, setShow] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState();
  const { errorToast, successToast } = useAllToasts();
  const navigate = useNavigate();

  const handelClick = () => {
    setShow(!show);
  };
  // All tested all works
  const submitHandler = async () => {
    if (!email || !password) {
      errorToast(EMPTY_FIELD);
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post("/api/user/login", {
        email,
        password,
      });
      setUserInfo(data);
      successToast(LOG_IN_SUCCESS);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (error) {
      errorToast(WRONG_PW_OR_USER);
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} valign="stretch">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button onClick={handelClick}>{show ? "Hide" : "Show"}</Button>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        onClick={submitHandler}
        isLoading={loading}
      >
        LOG IN
      </Button>
      {/* <Button
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("example@examle.com");
          setPassword("1234567");
        }}
      >
        GUEST USER LOG IN
      </Button> */}
    </VStack>
  );
};
