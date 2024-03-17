import { useEffect, useState } from "react"
import { getDatabase, push, ref, set,onValue,remove,update } from "firebase/database";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const[text,setText] = useState("")
  const[arr,setArr] = useState([])
  const[todoUpdate,setTodoUpdate] = useState("")
  const[isBtn,setIsBtn] = useState(true)
  const db = getDatabase();

  let handleInput = (e) => {
    setText(e.target.value)
  }

  // write operation
  let handleSubmit = (e) => {
    e.preventDefault()
    if (text !== "") {
      set(push(ref(db, 'add')), {
        myText: text,
      }).then(()=>{
        toast.success('Item created successfully', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      setText("")
    } else {
      toast.error('Please enter your text', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }
  // read operation
  useEffect(()=>{
    const TodoCountRef = ref(db, 'add' );
    setText("")
    onValue(TodoCountRef, (snapshot) => {
      let array = []
      snapshot.forEach( (item) => {
        array.push({...item.val(), id: item.key});
      })
    setArr(array);
  });
  },[])

  // ==delete operation
  let handleDelete = (Deleteid) => {
    remove(ref(db,'add/' + Deleteid)).then(()=>{
      toast.success('Item deleted successfully',{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
  }
  let handleEdit = (Editinfo) =>{
    setText(Editinfo.myText)
    setIsBtn(false)
    setTodoUpdate(Editinfo);
    toast.error('Are you sure you want to update your text',{
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    // todoUpdate(Deleteid)
  }
  let handleUpdate =(e)=>{
    e.preventDefault()
    update(ref(db, "add/" + todoUpdate.id),{
      myText: text,
    }).then(()=>{
      toast.success('Successfully updated your text', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
    setIsBtn(true)
    setText("")
  }
  return (
    <>
    <ToastContainer />
    <div className="bg-[#161A2B] w-[550px] m-auto mt-10 p-6 text-center text-white rounded-lg">
      <h1 className="text-2xl mt-[10px] mb-[26px] capitalize font-semibold">Write down your Daily activites</h1>
      <form className="relative w-[400px] mx-auto bg-[#161A2B]" >
          <input className="rounded-md border-2 w-full overflow-hidden  border-[#5D0CFF] border-solid bg-transparent py-[10px] px-[6px] pr-[120px] text-sm" onChange={handleInput} value={text}  type="text" placeholder="Add your list" />
          {isBtn ?
            <button className=" absolute h-full top-0 right-0  bg-[#8E2DE2] px-[13px] border-l-none rounded-r-md capitalize text-sm font-medium" onClick={handleSubmit}>add todo</button>
            :
            <button className=" absolute h-full top-0 right-0  bg-[#8E2DE2] px-[13px] border-l-none rounded-r-md capitalize text-sm" onClick={handleUpdate}>update</button>
          }
      </form>
      <div className="mt-[50px]">
        <ul className="flex flex-col-reverse">
          {arr.map((item,index)=>(
            <li className="w-full bg-[blueviolet] flex  mb-[10px] p-[15px] justify-between items-center rounded-[6px]" key={index}>
              <div className="text-xl pr-[8px]">
                {item.myText}
              </div>
              <div className="flex gap-5">
                <button className="text-3xl" onClick={()=> handleDelete(item.id)}><MdDeleteForever /></button>
                <button className="text-2xl" onClick={()=> handleEdit(item)}><FaEdit /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default App
