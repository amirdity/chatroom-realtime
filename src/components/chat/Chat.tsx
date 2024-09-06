import "./chat.css";
import more from "/more.png";

import video from "/video.png";
import edit from "/edit.png";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
// own have no picture
export default function Chat() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  function handleEmoji(e: { emoji: string }) {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  }
  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <span>amir fattahi</span>
            <p>front end developer</p>
          </div>
        </div>
        <div className="icons">
          <img src={more} alt="" />
          <img src={video} alt="" />
          <img src={edit} alt="" />
        </div>
      </div>
      <div className="center">
        <div className="message ">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>
              fsdf dsfsfsd fsd fs fd fds f sdf dfdsfsdf sdfd sfd f sf sdf
              sdfsdfsf sf sdf sd sd{" "}
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <p>
              fsdf dsfsfsd fsd fs fd fds f sdf dfdsfsdf sdfd sfd f sf sdf
              sdfsdfsf sf sdf sd sd{" "}
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message ">
          <img src="/avatar.png" alt="" />
          <div className="texts">
            <p>
              fsdf dsfsfsd fsd fs fd fds f sdf dfdsfsdf sdfd sfd f sf sdf
              sdfsdfsf sf sdf sd sd{" "}
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message own">
          <div className="texts">
            <img src="/camera.png" alt="" />
            <p>
              fsdf dsfsfsd fsd fs fd fds f sdf dfdsfsdf sdfd sfd f sf sdf
              sdfsdfsf sf sdf sd sd{" "}
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="/img.png" alt="" />
          <img src="/camera.png" alt="" />
          <img src="/mic.png" alt="" />
        </div>
        <input
          type="text"
          placeholder="type a message...."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="emoji">
          <img src="/emoji.png" alt="" onClick={() => setOpen(!open)} />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
}
