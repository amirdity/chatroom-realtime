import { FormEvent, useState } from "react";
import "./addUser.css";
import { toast } from "react-toastify";
import {
  arrayUnion,
  collection,
  doc,
  
  DocumentData,
  
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { useUserStore } from "../../../../lib/userStore";
export default function AddUser() {
  const [user, setUser] = useState({
    avatar: null,
    username: "",
    id:""
  });
  const { currentUser } = useUserStore((state)=>state as DocumentData);
  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);
      console.log(querySnapShot.docs[0]);

      setUser({
        avatar: querySnapShot.docs[0].data().avatar || null,
        username: querySnapShot.docs[0].data().username,
        id: querySnapShot.docs[0].id,
      });
    } catch (error) {
      toast.error((error as Error).message);
      console.log(error)
    }
  }
  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detail">
            <img src={user.avatar || "/avatar.png"} alt="" />
            <span>{user.username}</span>
          </div>
          <button onClick={handleAdd}>Add User</button>
        </div>
      )}
    </div>
  );
}
