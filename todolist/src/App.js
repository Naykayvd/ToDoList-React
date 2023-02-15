import React from 'react'
import './App.css';

function App() {
  const [todos, setTodos] = React.useState([])
  const [todo, setTodo] = React.useState("")

  React.useEffect(() => {
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)

    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])

  React.useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    }
    setTodos([ ...todos ].concat(newTodo))
    setTodo("")
  }

  function deleteTodo(id) {
    const updatedTodos = [ ... todos ].filter((todo) => todo.id != id)

    setTodos(updatedTodos)
  }

  function toggleComplete(id) {
    const updatedTodos = [ ...todos ].map((todo) => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  return (
    <div className="App">
      <h1>To Do List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo}/>
        <button type="submit" >ADD</button>
      </form>
      {todos.map((todo) => <div key={todo.id}>
        <div>{todo.text}</div>
        <button onClick={() => deleteTodo(todo.id)}>REMOVE</button>
        <input type="checkbox" onChange={() => toggleComplete(todo.id)} checked={todo.completed} />
        </div>)}
    </div>
  );
}

export default App;
