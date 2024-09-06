import { FormEvent, useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
export default function Login() {
  const [avatar, setAvatar] = useState({
    file: {},
    url: "",
  });
  console.log(avatar);
  function handleLogin(e: FormEvent) {
    e.preventDefault();
    toast.warn("hello");
  }
  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { username, email, password, file } = Object.fromEntries(formData);
    console.log(username, file);
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email as string,
        password as string
      );
      await setDoc(doc(db, "users", res.user.uid), {
        username: username as string,
        email: email as string,
        id: res.user.uid,
        block: [],
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });
      toast.success("Account created successfully, you are logged in");
    } catch (error) {
      toast.error((error as Error).message);
    }
  }
  function handleAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }
  return (
    <div className="login">
      <div className="item">
        <h2>welcome back</h2>
        <form action="" onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form action="" onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "/avatar.png"} alt="" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
            name="file"
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign In</button>
        </form>
      </div>
    </div>
  );
}
