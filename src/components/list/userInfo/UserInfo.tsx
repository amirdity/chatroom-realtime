import "./userInfo.css";
import { useUserStore } from "../../../lib/userStore";
type UserType = {
  currentUser: {
    username: string;
    avatar: string;
  };
}
const Userinfo = () => {
  const { currentUser } = useUserStore((state)=>state as UserType);

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="" />
        <h2 className="text">{currentUser.username}</h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="" />
        <img src="./video.png" alt="" />
        <img src="./edit.png" alt="" />
      </div>
    </div>
  );
};

export default Userinfo;
