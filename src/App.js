import React from "react";
import "./App.css";

const App = () => {
  const [todos, setTodos] = React.useState([]);
  const [todo, setTodo] = React.useState("");
  const [todoEditing, setTodoEditing] = React.useState(null);
  const [editingText, setEditingText] = React.useState("");

  React.useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);

  React.useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  return (
    <div id="todo-list">
      {/* FORM INICIAL */}
      <h1>WE.DIGI</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Qual o nome da lista?"
          value={todo}
        />
        {/*Bootão do form para adicionar item*/}
        <button type="submit">+</button>
        {/*Bootão do form para adicionar item*/}
      </form>
      {/* FORM INICIAL */}

      {/* Criar item */}
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div className="todo-text">
            <div>ITEM: {todo.text}</div>
            {/*Botão delete*/}
            <div className="todo-actions">
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
            {/*Botão delete*/}
          </div>
        </div>
      ))}
      {/* Criar lista */}

    </div>
  );
};

export default App;