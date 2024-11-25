import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import ProtectRoute from "./components/ProtectRoute";
import Toast from "./components/Toast";
import useShowToast from "./store/toast";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import useAuthUser from "./store/user";
import Profile from "./pages/ProfilePage";
import Modal from "./components/Modal";

function App() {
  const { message, status } = useShowToast();

  const user = useAuthUser((state) => state.user);

  return (
    <>
      <Toast message={message} status={status} />
      <Modal />
      <Routes>
        <Route
          path="/login"
          element={
            user == null || user == undefined ? (
              <LoginPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/register"
          element={
            user == null || user == undefined ? (
              <Register />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route element={<ProtectRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
