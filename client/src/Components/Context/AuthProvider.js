import { createContext, useContext, useState } from "react";
import axios from "axios";
// THIS is being csalled before we try to log in
const AuthContext = createContext();
const user = JSON.parse(localStorage.getItem("userInfo"));
export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(user);
  console.log("user auth provider", user);
  if (user) {
    axios.defaults.baseURL = "http://localhost:3000/";
    axios.defaults.headers.common = {
      Authorization: `Bearer ${userInfo.token}`,
    };
  }
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("userInfo"));
  //   if (user) {
  //     setUserInfo(user);
  //     axios.defaults.baseURL = "http://localhost:3000/";
  //     axios.defaults.headers.common = { Authorization: `Bearer ${user.token}` };
  //   }
  // }, []);
  return (
    <>
      <AuthContext.Provider
        value={{
          userInfo,
          setUserInfo,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuthState = () => {
  return useContext(AuthContext);
};

export function useAuthContext() {
  const authContext = useContext(AuthContext);

  if (authContext === undefined) {
    throw new Error("Auth context needs to be used within auth provider");
  }
  return authContext;
}

// {_id: "64a64d23a6c6b5ebf8c912d2", name: "NIcky", email: "n@n.com",…}
// email
// :
// "n@n.com"
// name
// :
// "NIcky"
// picture
// :
// "http://res.cloudinary.com/duptfaof6/image/upload/v1688620320/hybuubmkob8mw1nds1y6.jpg"
// token
// :
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTY0ZDIzYTZjNmI1ZWJmOGM5MTJkMiIsImlhdCI6MTcxMzc4NDk3OSwiZXhwIjoxNzE3MjQwOTc5fQ.GtySpDQcZRxxNn5CVOVKqJjH95yPFIciHDSyCV_065s"
// _id
// :
// "64a64d23a6c6b5ebf8c912d2"

// {"_id":"64a64d23a6c6b5ebf8c912d2","name":"NIcky","email":"n@n.com","picture":"http://res.cloudinary.com/duptfaof6/image/upload/v1688620320/hybuubmkob8mw1nds1y6.jpg","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTY0ZDIzYTZjNmI1ZWJmOGM5MTJkMiIsImlhdCI6MTcxMzc4NDk3OSwiZXhwIjoxNzE3MjQwOTc5fQ.GtySpDQcZRxxNn5CVOVKqJjH95yPFIciHDSyCV_065s"}

// Log in updates authProvider imd. and sets userInfo state
// I reload page and userInfo is empty
