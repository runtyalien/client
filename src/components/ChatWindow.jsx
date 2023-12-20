import {
  Box,
  Card,
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { green } from "@mui/material/colors";

const ChatWindow = () => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("message-from-server", (data) => {
      setChat((prev) => [...prev, data.message]);
    });
  }, [socket]);

  function handleForm(e) {
    e.preventDefault();
    socket.emit("send-message", { message });
    setMessage("");
  }

  return (
    <Card sx={{ padding: 2, marginTop: 10 }}>
      <Box sx={{ marginBottom: 5 }}>
        <Card sx={{ padding:2, backgroundColor:"green" }}>
          {chat.map((message) => (
            <Typography key={message}>{message}</Typography>
          ))}
        </Card>
      </Box>

      <Box component="form" onSubmit={handleForm}>
        <OutlinedInput
          size="small"
          placeholder="Write Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" edge="end">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
    </Card>
  );
};

export default ChatWindow;
