import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../Context/SocketProvider";

const MainScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  console.log(socket);
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();

      if (!email || !room) {
        alert("Please fill in both fields.");
        return;
      }

      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join");
    };
  }, [socket, handleJoinRoom]);

  return (
    <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Video Call Screen</h1>
        <form onSubmit={handleSubmitForm}>
          <div>
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ display: "block", margin: "10px auto", width:"300px", height:"40px" }}
            />
          </div>
          <div>
            <label htmlFor="room">Room Number</label>
            <input
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              style={{ display: "block", margin: "10px auto",  width:"300px", height:"40px" }}
            />
          </div>
          <button type="submit" style={{ marginTop: "20px", width:"290px", height:"70px", backgroundColor:"blue", color:"white" }}>
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainScreen;
