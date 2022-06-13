import { useState, useEffect, useMemo, useCallback } from "react";
import dayjs from "dayjs";
import SocketCtrl from "../services/SocketCtrl";

const useSocketCtrl = () => {
  const [messages, setMessages] = useState([]);
  const [socketId, setSocketId] = useState(null);
  const [totalUsers, setTotalUsers] = useState(1);

  const socket = useMemo(() => {
    return new SocketCtrl();
  }, []);

  useEffect(() => {
    socket.connect((socket) => {
      setSocketId(socket.id);
    });
    socket.on("USER_CONNECTED", (enterUser) => {
      const time = Date.now();
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          socket.socket.id === enterUser.id
            ? {
                id: `i-copy-u-${time}`,
                time: dayjs(time).format("HH:mm"),
                message: `Bienvenido a iCopyU!, se respetuoso con todo el mundo`,
                userName: "iCopyU!",
                position: "l",
              }
            : {
                id: `${enterUser.id}-${time}`,
                time: dayjs(time).format("HH:mm"),
                message: `El usuario ${enterUser.id} ha entrado en la sala`,
                userName: "iCopyU!",
                position: "l",
              },
        ];
      });
      setTotalUsers(enterUser.totalUsers);
    });
    socket.on("USER_DISCONNECTED", (goneUser) => {
      const time = Date.now();
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          {
            id: `${goneUser.id}-${time}`,
            time: dayjs(time).format("HH:mm"),
            message: `El usuario ${goneUser.id} ha dejado la sala`,
            userName: "iCopyU!",
            position: "l",
          },
        ];
      });
      setTotalUsers(goneUser.totalUsers);
    });
    socket.on("MESSAGE", (messageData) => {
      const time = Date.now();
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          {
            id: `${messageData.userId}-${time}`,
            time: dayjs(messageData.time).format("HH:mm"),
            message: messageData.message,
            userName: messageData.userId,
            position: "l",
          },
        ];
      });
    });
    return () => {
      socket.destroy();
    };
  }, []);

  const sendMessage = useCallback(
    (message) => {
      const time = Date.now();
      setMessages((prevMessages) => {
        return [
          ...prevMessages,
          {
            id: `${socketId}-${time}`,
            time: dayjs(time).format("HH:mm"),
            message,
            userName: socketId,
            position: "r",
          },
        ];
      });
      socket.emit("MESSAGE", {
        time,
        message,
      });
    },
    [socketId, socket]
  );

  return { messages, socketId, totalUsers, sendMessage };
};

export default useSocketCtrl;
