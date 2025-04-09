import { useRef, useState } from 'react'
function App() {
  // console.log((localStorage.getItem("list")));
  const [userList, setUserList] = useState(JSON.parse(localStorage.getItem("list")))
  const [showModal, setShowModal] = useState(userList ? false : true);
  const [text, setText] = useState('');
  const [isEdit, setIsEdit] = useState(null);
  const defaultHeight = useRef(null);
  const textArea = useRef(null);

  function handleNewItem() {
    if (isEdit == null && !text) return;
    let index = isEdit || 0;
    userList.list.splice(index, 0, text);
    setUserList(prev => ({ ...prev, list: [...userList.list] }));
    setText("");
    setCurrentHeight(null);
    localStorage.setItem("list", JSON.stringify({ ...userList }));
  }
  function handleCreateList() {
    if (!userList) {
      alert("ListName Cannot be empty");
    } else {
      setShowModal(false);
      setUserList((prev) => ({
        ...(prev ?? {}),
        list: []
      }));
      localStorage.setItem("list", JSON.stringify({ ...userList, list: [] }));
    }
  }
  function handleDelete(index) {
    let newList = userList.list.filter((ele, ind) => {
      return (ind != index)
    });
    setUserList({ ...userList, list: newList });
    localStorage.setItem("list", JSON.stringify({ ...userList, list: newList }));
  }
  function handleEdit(index) {
    console.log(textArea);
    setText(userList.list[index]);
    setIsEdit(index);
    textArea.current.focus();
  }
  function handleFinishEdit() {
    handleNewItem(isEdit);
    setIsEdit(null);
    handleDelete(isEdit + 1);
  }
  function handleCancelEdit() {
    setIsEdit(null);
    setText("");
  }

  let getUserInfoWindow = <div className="relative h-screen bg-black/70 z-[9999] flex flex-col items-center justify-center">

    <div className="w-[90%] max-w-md p-6 bg-white text-black border border-black shadow-[6px_6px_0_0_#000] flex flex-col space-y-5">

      <h1 className="font-heading text-2xl font-bold uppercase border-b border-black pb-2">
        Create New List
      </h1>

      <div className="flex flex-col space-y-1">
        <label htmlFor="listName" className="font-medium uppercase tracking-wide font-heading">
          List Name
        </label>
        <input
          type="text"
          id="listName"
          className="font-body p-2 bg-white border border-black focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="e.g. TODO or Books"
          autoComplete='off'
          onChange={(e) => {
            setUserList((prev) => ({
              ...(prev ?? {}),
              listName: e.target.value,
            }));
          }}
        />
      </div>

      <button
        onClick={handleCreateList}
        className="bg-black text-white font-bold py-2 px-4 border-2 border-black hover:bg-white hover:text-black transition-all">
        Create List
      </button>
    </div>

    <a href="https://github.com/The-Wee-Lad/list-creater" target='_blank' className='fixed bottom-2 left-2 '>
      <div className='p-1 bg-gray-400 text-gray-500 rounded-sm hover:bg-black hover:text-white'>
        created by Aditya Narayan
      </div>
    </a>

  </div>

  let newbutton = <div className='w-[50%] bg-amber-200 m-auto text-xl text-center py-1 px-1 
  hover:bg-black hover:text-white md:p-4 md:w-[25%] md:ml-0'
    onClick={() => { handleNewItem() }}
  > + New</div>;

  let editClustor = <div className='w-[50%] m-auto md:w-[25%] md:ml-0 flex  transition-all ease-in-out'>
    <div className='w-[50%] bg-green-200 m-auto text-xl text-center py-1 px-1 font-special
  hover:bg-black hover:text-white md:p-4  transition-all duration-300 ease-in'
      onClick={() => { handleFinishEdit() }}
    > edit</div>
    <div className='w-[50%] bg-red-200 m-auto text-xl text-center py-1 px-1 font-special
  hover:bg-black hover:text-white md:p-4 transition-all duration-300 ease-in'
      onClick={() => { handleCancelEdit() }}
    > cancel </div>
  </div>;

  let newList = (
    <div className='h-full w-full bg-white border-3 border-black'>
      {!(userList?.list?.length > 0) && (
        <p className='text-center p-10 text-black font-bold font-syne text-[1.3rem] md:text-[1.5rem] uppercase border-b-2 border-black'>
          No Lists So Far — Create a New One
        </p>
      )}
      {(userList?.list?.length > 0) && <ul className='flex flex-col gap-[2px] p-2'>
        {
          userList?.list?.map((element, index) => (
            <li
              key={index}
              className='w-full border border-black  bg-black flex flex-row '
            >
              <div className='p-3 w-full font-sans text-black font-medium bg-[#efefef] text-[0.95rem] tracking-wide 
              transition-all duration-300 ease-in-out'
                style={{ backgroundColor: (isEdit == index) && ("gray") }}
              >
                {element}
              </div>
              <div className='bg-blue-100 border-l-2 gap-0.5 p-1 flex flex-row m-[0.01rem] items-center justify-center'>
                <button className='bg-green-500 w-9 h-9 rounded-lg hover:scale-112  disabled:bg-gray-500 disabled:hover:scale-100
                transition-all duration-300 ease-in-out'
                  disabled={(isEdit==index)}
                  onClick={() => { handleEdit(index) }}>
                  <img src="/create.png" alt="Create" className='h-full w-full' />
                </button>

                <button className='bg-red-500 w-9 h-9 rounded-lg hover:scale-112 disabled:bg-gray-500 disabled:hover:scale-100
                transition-all duration-300 ease-in-out'
                  disabled={(isEdit==index)}
                  onClick={() => { handleDelete(index); }}
                >
                  <img src="/delete.png" alt="Create" className='h-full w-full' />
                </button>
              </div>
            </li>
          ))
        }
      </ul>
      }
    </div>
  );


  let list = <div className='flex flex-col justify-center-safe items-start-safe'>
    <header className='gap-2 p-4 border-black border-2 m-1 flex flex-row items-center justify-left '>
      <div className='text-3xl font-semibold font-heading wrap-break-word overflow-auto  scrollbar-hide '>{userList?.listName ?? ""}</div>
      <div className='ml-auto text-sm text-center border-black border-1 py-3 px-3 font-special
      hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out lg:ml-5
        font-medium'
        onClick={() => { localStorage.clear(); location.reload(); }}
      > Delete List </div>
    </header>
    <div className='bg-amber-500 text-amber-950 font-display text-sm p-2 md:p-4 pb-1 md:pb-1'>
      <textarea rows="1" className={`bg-white w-full mb-1 p-2 font-sans font-medium text-[1.15rem] resize-none md:text-[1.30rem]
    ${isEdit !== null ? 'focus:outline-auto focus:outline-green-500' : ''}`}
        value={text}
        onChange={
          (e) => {
            if (!defaultHeight.current)
              defaultHeight.current = e.target.clientHeight;
            e.target.style.height="auto";
            e.target.style.height=Math.min(e.target.scrollHeight, 10 * defaultHeight.current) + "px";
            setText(e.target.value);
          }
        }
        ref={textArea}
      />
      {isEdit == null ? newbutton : editClustor}
      <p className='text-[10px] m-2 mb-0'>Click [ + NEW ] to Add new item. <br />You Can Edit and Delete items as well</p>
    </div>
    {newList}
  </div>;

  return (
    <>
      {showModal && getUserInfoWindow}
      {!showModal && list}
    </>
  )
}

export default App;