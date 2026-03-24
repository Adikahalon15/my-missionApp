import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMission } from "../store/missionSlice";

export const useSocket = (url: string) => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState<"connecting" | "open" | "closed" | "error">("connecting");

  useEffect(() => {
    if (!url) return;

    const socket = new WebSocket(url);

    socket.onopen = () => {
      setStatus("open");
      console.log("WebSocket Connected to:", url);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
    
        dispatch(addMission({
          title: data.text || data.title || "משימה חדשה מהשרת",
          difficulty: Number(data.difficulty) || 1 
        }));

        console.log("New mission added", data);
      } catch (err) {
        console.error("Error in understanding", err);
      }
    };

    socket.onerror = () => {
      setStatus("error");
      console.error("WebSocket Error ");
    };

    socket.onclose = () => {
      setStatus("closed");
      console.log("WebSocket Disconnected ");
    };
    return () => {
      socket.close();
    };
  }, [url, dispatch]);

  return { status };
};