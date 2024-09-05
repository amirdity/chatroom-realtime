import "./userInfo.css"
import more from "/more.png"

import video from "/video.png";
import edit from "/edit.png";
import avatar from "/avatar.png";
export default function UserInfo() {
  return (
    <div className="userInfo">
      <div className="user">
        <img src={avatar} alt="" />
        <h2>amir fattahi</h2>
      </div>
      <div className="icons">
        <img src={more} alt="" />
        <img src={video} alt="" />
        <img src={edit} alt="" />
      </div>
    </div>
  );
}