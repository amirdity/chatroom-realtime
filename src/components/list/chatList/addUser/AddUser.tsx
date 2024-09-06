import { FormEvent, useState } from "react";
import "./addUser.css";
import { toast } from "react-toastify";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";
export default function AddUser() {
  const [user, setUser] = useState({
    avatar: null,
    username: null,
  });
  async function handleSearch(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);

      setUser({
        avatar: querySnapShot.docs[0].data().avatar || null,
        username: querySnapShot.docs[0].data().username || null,
      });
    } catch (error) {
      toast.error((error as Error).message);
    }
  }
  function handleAdd() {}
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
