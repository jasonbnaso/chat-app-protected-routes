import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
//ENDPOINT will change on deployment to the deployed url

const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:5001";

export const socket = io(URL);
