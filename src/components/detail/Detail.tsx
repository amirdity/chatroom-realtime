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
      </div>
    </div>
  );
}
