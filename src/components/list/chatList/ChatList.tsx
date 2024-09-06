import { useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/AddUser";
export default function ChatList() {
  const [addMode, setAddMode] = useState(false);
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input
            type="text"
            name=""
            id=""
            placeholder="search"
            className="p-4"
          />
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
    {addMode &&  <AddUser/>}
    </div>
  );
}
