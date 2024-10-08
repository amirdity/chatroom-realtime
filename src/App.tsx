import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { DocumentData } from "firebase/firestore";
type UserType = {
  currentUser: DocumentData;
  isLoading: boolean;
  fetchUserInfo: (uid: string) => void;
};
export default function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore(
    (state) => state as UserType
  );
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid as string);
    });
    return () => unSub(); // Clean up function when unmounting component
  }, [fetchUserInfo]);
  if (isLoading) return <div className="loading">Loading...</div>
  return (
    <div className="container">
      {currentUser ? (
        <>
          {/* <List /> */}
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
}
