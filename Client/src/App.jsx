import { Routes, Route, Navigate } from "react-router-dom";
import { Chat, Register, Login } from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import { Container } from "react-bootstrap";
import { NavBar } from "./components";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import ChatContextProvider from "./context/ChatContext";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <ChatContextProvider user={user}>
      <NavBar />
      <Container>
        <Routes>
          <Route path="/" element={user ? <Chat /> : <Navigate to="/login" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
      </Container>
    </ChatContextProvider>
  );
};

export default App;
