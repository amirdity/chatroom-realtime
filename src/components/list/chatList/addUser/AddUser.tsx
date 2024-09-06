import { useState } from "react";
import "./addUser.css";
export default function AddUser() {
  const [user, setUser] = useState({
    avatar: null,
    username: null,
  });
  function handleSearch() {
    setUser({
      avatar: null,
      username: null,
    });
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
