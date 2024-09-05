import './chatList.css'
export default function ChatList() {
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="/search.png" alt="" />
          <input type="text" name="" id="" placeholder='search' />
        </div>
        <img src="/plus.png" alt="" className='add'/>
      </div>
    </div>
  )
}