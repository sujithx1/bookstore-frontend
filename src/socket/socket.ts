import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_API_SOCKET_URL, {
  transports: ["websocket"], 
  withCredentials: true,
  path: "/ws",
});   