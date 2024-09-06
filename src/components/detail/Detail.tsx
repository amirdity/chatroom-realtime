import "./detail.css";

export default function Detail() {
  return (
    <div className="detail">
      <div className="user">
        <img src="/avatar.png" alt="" />
        <h2>amir fattahi</h2>
        <p>front end developer</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src="/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="/arrowUp.png" alt="" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="/arrowDown.png" alt="" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="" alt="" />
                <span>photo_2024_2.png</span>
              </div>
              <img src="/download.png" alt="" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="/arrowUp.png" alt="" />
          </div>
        </div>
        <button>Block the user</button>
        <button className="logout">logout</button>
      </div>
    </div>
  );
}
