import { useState, useEffect } from "react";
import axios from "axios";

export const useChats = () => {
  const [chatIsLoading, setChatIsLoading] = useState(true);
  const [chatLoadingError, setChatLoadingError] = useState(false);
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      setChatIsLoading(true);
      const { data } = await axios.get("/api/chat");
      setChats(data);
    } catch (e) {
      setChatLoadingError(true);
    } finally {
      setChatIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return {
    chats,
    chatIsLoading,
    chatLoadingError,
    refetch: () => fetchChats(),
  };
};

// To use the hook in a component
// import { useChats } from './path/to/useChats';

// const { chatIsLoading, chatLoadingError, chats } = useChats();
