import "./chat.css";
import more from "/more.png";

import video from "/video.png";
import edit from "/edit.png";

export default function Chat() {
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
      <div className="center"></div>
      <div className="bottom">
        <div className="icons">
          <img src="/img.png" alt="" /><img src="/camera.png" alt="" /><img src="/mic.png" alt="" />
        </div>
        <input type="text" placeholder="type a message...." />
        <div className="emoji">
          <img src="/emoji.png" alt="" />
        </div>
        <button className="sendButton">Send</button>
      </div>
    </div>
  );
}
