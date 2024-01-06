import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import './App.css'
function App() {
  let counter = 0
  const [item, setItem] = useState("")
  const [enterValue, setEnterValue] = useState([])
  const [edititemid,setEdititemid]=useState(null)
  const addItem = () => {
   if(item!=="")
   {
    const newItem = {
      id:edititemid || uuidv4(),
      item: item
    }
    if(edititemid)
    {
      setEnterValue(enterValue.map(data=>data.id===edititemid ? newItem :data))
      setEdititemid(null)
    }
    else{
    setEnterValue([...enterValue, newItem])
    }
    counter++
    setItem('')
  }
   }
  const deleteItem = (id) => {
    const remainingArray = enterValue.filter(data => data.id !== id)
    setEnterValue(remainingArray)

  }
  const editItem=(id,value)=>
  {
    setItem(value)
    setEdititemid(id)
  }
  return (
    <div className="todo">
      <h3>ToDo App</h3>
      <div className='addDiv'>
        <input type='text' placeholder='Add new task' value={item} onChange={(e) => setItem(e.target.value)} />
       {
        !edititemid ?
        ( <FaPlus color="white" onClick={addItem} className="addBtn"/>) :
        ( <FaRegEdit color="white" onClick={addItem} className="addBtn"/>)
        
       }

      </div>
      {
        enterValue.map((v) => (
          <div key={v.id} className='viewItem'>
            <p className='taskText'>{++counter}-{v.item}</p>
            <div className='editDel'>
            <FaRegEdit className='editBtn' onClick={()=>editItem(v.id,v.item)} />
            <MdDeleteForever onClick={() => deleteItem(v.id)} className='deleteBtn'/>
            </div>
          </div>
        ))
      }
      </div>
  )
}

export default App
