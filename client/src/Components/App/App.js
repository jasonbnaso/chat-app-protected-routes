import "./App.scss";
// import { Navbar } from "../Navbar/Navbar";
import { Routing } from "../Routing/Routing";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import { ChatProvider } from "../Context/ChatProvider";
import { AuthProvider } from "../Context/AuthProvider";

export const App = () => {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Router>
        <ChakraProvider theme={theme}>
          <AuthProvider>
            <ChatProvider>
              <Routing />
            </ChatProvider>
          </AuthProvider>
        </ChakraProvider>
      </Router>
    </div>
  );
};
