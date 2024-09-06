import { SetStateAction, useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, DocumentData, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function ChatList() {
  const [addMode, setAddMode] = useState(false);
  const [chat, setChats] = useState([]);
  const { currentUser } = useUserStore((state) => state as DocumentData);
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        // setChat(doc.data() as SetStateAction<never[]>);
        const items = res.data()?.chats;

        const promises = items.map(async (item: { receiverId: string }) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);

        setChats(
          chatData.sort((a, b) => b.updatedAt - a.updatedAt) as SetStateAction<
            never[]
          >
        );
      }
    );

    return () => unSub();
  }, [currentUser.id]);
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="text" name="" id="" placeholder="search" />
        </div>
        <img
          src={addMode ? "/minus.png" : "/plus.png"}
          alt=""
          className="add"
          onClick={() => setAddMode(!addMode)}
        />
      </div>
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>amir</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>amir</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>amir</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>amir</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>amir</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>amir</span>
          <p>hello</p>
        </div>
      </div>
      <div className="item">
        <img src="/avatar.png" alt="" />
        <div className="texts">
          <span>amir</span>
          <p>hello</p>
        </div>
      </div>
      {chat.map((chat) => (
        <div className="item" key={Math.random()}>
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <span>amir</span>
            <p>hello</p>
          </div>
        </div>
      ))}
      {addMode && <AddUser />}
    </div>
  );
}
