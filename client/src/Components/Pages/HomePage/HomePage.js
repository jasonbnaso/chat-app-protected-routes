import React, { useEffect } from "react";
import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { LogIn } from "../../Auth/LogIn";
import { SignUp } from "../../Auth/SignUp";

export const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg="white"
        w="100%"
        m="0  0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" color="#3b5998">
          Chat
        </Text>
      </Box>
      <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
        <Tabs isFitted variant="solid-rounded" colorScheme="gray">
          <TabList mb="1em">
            <Tab>LOG IN</Tab>
            <Tab>SIGN UP</Tab>
            {/* <Tab _selected={{ bg: "gray.400" }}>LOG IN</Tab>
            <Tab _selected={{ bg: "gray.400" }}>SIGN UP</Tab> */}
          </TabList>
          <TabPanels>
            <TabPanel>
              <LogIn />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};
