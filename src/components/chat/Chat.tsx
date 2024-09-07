import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useRef,
  useState,
} from "react";
import { useUserStore } from "../../lib/userStore";
import { useChatStore } from "../../lib/chatStore";
import { arrayUnion, doc, DocumentData, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { format, TDate } from "timeago.js";
import upload from "../../lib/upload";
// own have no picture
export default function Chat() {
  const [chat, setChat] = useState<DocumentData>();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);
  const [img, setImg] = useState({
    file: {},
    url: "",
  });

  const { currentUser } = useUserStore((state) => state as DocumentData);
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore((state) => state as DocumentData);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);
  function handleEmoji(e: { emoji: string }) {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  }
  const handleImg = (e: { target: { files: (Blob | MediaSource)[] } }) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0] as File,
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
    const handleSend = async () => {
      if (text === "") return;

      let imgUrl = null;

      try {
        if (img.file) {
          imgUrl = await upload(img.file as File);
        }

           await updateDoc(doc(db, "chats", chatId), {
             messages: arrayUnion({
               senderId: currentUser.id,
               text,
               createdAt: new Date(), imgUrl
              //  ...(imgUrl && { img: imgUrl }),
             }),
           });

        const userIDs = [currentUser.id, user.id];

        userIDs.forEach(async (id) => {
          const userChatsRef = doc(db, "userchats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatsData = userChatsSnapshot.data();

            const chatIndex = userChatsData.chats.findIndex(
              (c: { chatId: string; }) => c.chatId === chatId
            );

            userChatsData.chats[chatIndex].lastMessage = text;
            userChatsData.chats[chatIndex].isSeen =
              id === currentUser.id ? true : false;
            userChatsData.chats[chatIndex].updatedAt = Date.now();

            await updateDoc(userChatsRef, {
              chats: userChatsData.chats,
            });
          }
        });
      } catch (err) {
        console.log(err);
      } finally {
        setImg({
          file: {},
          url: "",
        });

        setText("");
      }
    };
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avatar.png"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>Lorem ipsum dolor, sit amet.</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="" />
          <img src="./video.png" alt="" />
          <img src="./info.png" alt="" />
        </div>
      </div>
      <div className="center">
        {chat?.messages?.map(
          (message: {
            senderId: unknown;
            createAt: Key | null | undefined;
            img: string | undefined;
            text:
              | string
              | number
              | boolean
              | ReactElement<unknown, string | JSXElementConstructor<unknown>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            createdAt: { toDate: () => TDate };
          }) => (
            <div
              className={
                message.senderId === currentUser?.id ? "message own" : "message"
              }
              key={message?.createAt}
            >
              <div className="texts">
                {message.img && <img src={message.img} alt="" />}
                <p>{message.text}</p>
                <span>{format(message.createdAt.toDate())}</span>
              </div>
            </div>
          )
        )}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <img src="./img.png" alt="" />
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={() => handleImg}
          />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You cannot send a message"
              : "Type a message..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <img
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button
          className="sendButton"
          onClick={handleSend}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
}
