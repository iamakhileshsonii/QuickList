import React, { useEffect, useState } from 'react';
import SingleTodo from '../cards/SingleTodo';

const Home = () => {

  const [toDo, setTodo] = useState([]);
  const [todoInput, setTodoInput] = useState('');

    // All Todos
    const [toDos, setToDos ] = useState([]);

  useEffect(()=>{
    function fetchToDos(){
      const TodoList = JSON.parse(localStorage.getItem('toDo')) || [] ;
      setToDos(TodoList)
    }
    fetchToDos();
  }, [])


  // Handle form submit
  const handleSubmit = (event)=>{
    event.preventDefault();

    const newTodo = [...toDo, {id: Date.now(), task: todoInput}];
    setTodo(newTodo)

    localStorage.setItem('toDo', JSON.stringify(newTodo))
    setTodoInput('')

  }

  // Handle add todo
  function addTodo(value){
    setTodoInput(value)
  }

  // Handle Delete
  function handleDelete(id){
    const deleteTodo = toDos.filter(
      (delTodo) => delTodo.id != id
      )

      localStorage.setItem('toDo', JSON.stringify(deleteTodo));
      setToDos(deleteTodo);

  }

  return (
   
   <div className='min-h-screen bg-gradient-to-r from-black to-red py-5 px-10 md:py-10 md:px-96 block justify-center w-full'>
    <form className='justify-center' onSubmit={handleSubmit}>
      <div className='flex bg-glass rounded-sm px-3 justify-center w-full'>
      <input type="text" placeholder='Add your task...' className= 'bg-transparent py-1 px-2 focus:outline-none text-white' value={todoInput} onChange={(e)=>addTodo(e.target.value)} name='todoInput'/>
      <button className='' type='submit'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-white self-middle">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
      </svg>
      </button>
      </div>

      <div className='my-10'>
        {
          toDos && toDos.map((todo)=>(
            <SingleTodo toDo={todo} key={todo.id} deleteTodo={()=>handleDelete(todo.id)}/>
          ))
        }
        
      </div>
     
    </form>
   </div>
  )
}

export default Home