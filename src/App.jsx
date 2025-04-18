import { useRef, useState } from 'react'
import CreateListModal from './CreateListModal';
import DeleteModal from './DeleteModal.jsx';
function App() {
  const [userList, setUserList] = useState(JSON.parse(localStorage.getItem("list")))
  const [showModal, setShowModal] = useState(userList ? false : true);
  const [showDeleteModal, setShowDeleteModal] = useState({ show: false, type: null });
  const [text, setText] = useState('');
  const [isEdit, setIsEdit] = useState(null);
  const defaultHeight = useRef(36);
  const textArea = useRef(null);
  function adjustHeight() {
    void textArea.current.offsetHeightl;
    textArea.current.style.height = "auto";
    textArea.current.style.height = Math.min(textArea.current.scrollHeight, 10 * defaultHeight.current) + "px";
    console.log(defaultHeight.current);
  }
  function handleNewItem() {
    if (isEdit == null && !text) return;
    let index = isEdit || 0;
    userList.list.splice(index, 0, text);
    setUserList(prev => ({ ...prev, list: [...userList.list] }));
    setText("");
    localStorage.setItem("list", JSON.stringify({ ...userList }));
    textArea.current.value = "";
    adjustHeight()
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
  function handleDeleteList() {
    localStorage.clear(); location.reload();
  }

  function handleDeleteItem(index) {
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
    textArea.current.value = userList.list[index]
    adjustHeight()
  }
  function handleFinishEdit() {
    handleNewItem(isEdit);
    setIsEdit(null);
    handleDeleteItem(isEdit + 1);
    textArea.current.value = "";
    adjustHeight()
  }
  function handleCancelEdit() {
    setIsEdit(null);
    setText("");
    textArea.current.value = "";
    adjustHeight()
  }

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
              transition-all duration-300 ease-in-out whitespace-pre-line'
                style={{ backgroundColor: (isEdit == index) && ("gray") }}
              >
                {element}
              </div>
              <div className='bg-blue-100 border-l-2 gap-0.5 p-1 flex flex-row m-[0.01rem] items-center justify-center'>
                <button className='bg-green-500 w-9 h-9 rounded-lg hover:scale-112  disabled:bg-gray-500 disabled:hover:scale-100
                transition-all duration-300 ease-in-out'
                  disabled={(isEdit == index)}
                  onClick={() => { handleEdit(index) }}>
                  <img src="/create.png" alt="Create" className='h-full w-full' />
                </button>

                <button className='bg-red-500 w-9 h-9 rounded-lg hover:scale-112 disabled:bg-gray-500 disabled:hover:scale-100
                transition-all duration-300 ease-in-out'
                  disabled={(isEdit == index)}
                  onClick={() => { setShowDeleteModal({ show: true, type: "Item", index }) }}
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
        onClick={() => { setShowDeleteModal({ show: true, type: "List" }) }}
      > Delete List </div>
    </header>
    <div className='bg-amber-500 text-amber-950 font-display text-sm p-2 md:p-4 pb-1 md:pb-1'>
      <textarea rows="1" className={` bg-white w-full mb-1 p-2 font-sans font-medium text-[1.15rem] resize-none md:text-[1.30rem]
    ${isEdit !== null ? 'focus:outline-auto focus:outline-green-500' : ''}`}
        value={text}
        onChange={
          (e) => {
            if (!defaultHeight.current && textArea.current)
              defaultHeight.current = textArea.current.clientHeight;
            console.log("iNSIDE",defaultHeight.current);
            adjustHeight();
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
      {showModal && <CreateListModal textChange={(e) => {
        setUserList((prev) => ({
          ...(prev ?? {}),
          listName: e.target.value,
        }));
      }}
        handleCreateList={handleCreateList}
      />}
      {showDeleteModal?.show && <DeleteModal onConfirm={
        showDeleteModal.type == "List" ? handleDeleteList : () => { handleDeleteItem(showDeleteModal.index); setShowDeleteModal({ show: false }) }
      }
        onCancel={() => { setShowDeleteModal({ show: false }); }}
        item={showDeleteModal.type}
      />}
      {!showModal && list}
    </>
  )
}

export default App;