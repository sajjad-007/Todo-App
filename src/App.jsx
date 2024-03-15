import { useState } from "react"
import { getDatabase, push, ref, set,onValue } from "firebase/database";


function App() {
  const[text,setText] = useState("")
  const db = getDatabase();

  let handleInput = (e) => {
    setText(e.target.value)
  }

  // write operation
  let handleSubmit = (e) => {
    e.preventDefault()
    console.log(text);
    if (text !== "") {
      set(push(ref(db, 'add')), {
        myText: text,
      });
    } else {
      console.log("enter your text");
    }
  }
  // read operation
  const starCountRef = ref(db, 'add');
  onValue(starCountRef, (snapshot) => {
  // const data = snapshot.val();
  console.log;
  });

  return (
    <div className="bg-[#161A2B] w-[550px] m-auto mt-6 p-5 text-center text-white rounded-[10px]">
      <h1 className="text-2xl mb-[20px] capitalize">Write down your Daily Duties</h1>
        <form className="relative w-[360px] mx-auto bg-[#161A2B]" >
          <input className="rounded-sm border-2 w-full overflow-hidden  border-[#5D0CFF] border-solid bg-transparent py-[10px] px-[6px] pr-[120px] text-sm" onChange={handleInput}  type="text" />
          <button className=" absolute h-full top-0 right-0  bg-[#8E2DE2] px-[13px] border-l-none rounded-sm capitalize text-sm" onClick={handleSubmit}>add todo</button>
        </form>
    </div>
  )
}

export default App
