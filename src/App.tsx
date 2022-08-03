import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import EditTodoForm from "./components/TodoEditor";
import PostService from "./api/PostService";
import { ITodo } from "./types/types";

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number>();

  // class method getById
  const selectedTodo = useMemo(
    () => todos.find((todo) => todo.id === selectedTodoId),
    [selectedTodoId]
  );

  useEffect(() => {
    (async () => {
      const response = await PostService.getAllTodos();

      const data = (await response.json()) as ITodo[];

      setTodos(data);
    })();
  }, []);

  return (
    <main className="App">
      <TodoList
        todos={todos}
        setTodos={setTodos}
        selectedTodoId={selectedTodoId}
        setSelectedTodoId={setSelectedTodoId}
      />
      <EditTodoForm todo={selectedTodo} />
    </main>
  );
}

export default App;
