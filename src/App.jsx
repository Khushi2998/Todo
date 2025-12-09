import { useState , useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';




function App() {
  const [todo, setTodo] = useState("")
  const [todos,setTodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      setTodos(JSON.parse(todoString))
    }
  },[])

     const saveToLS = (items) => {
    localStorage.setItem("todos", JSON.stringify(items))
  }

  const handleEdit = (e, id) => {
    const t = todos.find(i=>i.id === id)
     setTodo(t.todo)
    const newTodos = todos.filter(item=>{
      return item.id !==id
    })
    setTodos(newTodos)
    saveToLS(newTodos)

  }

  const handleDelete = (e, id) => {
  
    const newTodos = todos.filter(item => item.id!==id);
    
    setTodos("")
    saveToLS(newTodos)

  }
  

  const handleAdd = () => {
      if(!todo.trim()) return
      const newTodos=([...todos, {id: uuidv4(), todo, isCompleted: false}])
      setTodos(newTodos)
      setTodo("")
      saveToLS(newTodos)
  }

  const handleChange = (e) => {
      setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
  const id = e.target.name;
  const newTodos = todos.map(item =>
    item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
  );
  setTodos(newTodos)
  saveToLS(newTodos)
};

 return(
    <>
  
    <Navbar/>
       <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-full">
         <div className="addTodo">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="bg-white text-black border border-gray-400 p-2 rounded-md mx-6" />
                  <button onClick={handleAdd} className="bg-violet-500 hover:bg-violet-950 text-white px-3 py-1 rounded-md mx-6 ">
                  Save </button>
         </div>
          <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item=>{

            return <div key={item.id} className="flex w-1/4 my-3 justify-between">
              <div className="flex gap-5">
                  <input name={item.id}
                  onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                  <div className={item.isCompleted?"line-through":""}> {item.todo}</div>
               </div>
              <div className="buttons flex h-full">
                 <button onClick={(e) =>handleEdit(e, item.id)} className="bg-violet-500 hover:bg-violet-950 text-white px-3 py-1 rounded-md mx-6">Edit</button>
                 <button onClick={(e) =>{handleDelete(e,item.id)}} className="bg-violet-500 hover:bg-violet-950 text-white px-3 py-1 rounded-md mx-6 ">Delete</button>
              </div>
            </div>
            })}
        </div>
      </div>

    </>
 )
}

export default App
