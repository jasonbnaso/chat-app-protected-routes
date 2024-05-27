import { Route, Routes } from "react-router-dom";
import { HomePage } from "../Pages/HomePage/HomePage";
import { ChatPage } from "../Pages/ChatPage/ChatPage";
import { Protected } from "../Protected/Protected";

export const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/chats"
          element={
            <Protected>
              <ChatPage />
            </Protected>
          }
        ></Route>
      </Routes>
    </div>
  );
};
