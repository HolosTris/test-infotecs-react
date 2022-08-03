import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import EditTodoForm from "./components/TodoEditor";
import PostService from "./api/PostService";
import { ITodo, Todo } from "./types/types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number>();

  const selectedTodo = useMemo(() => {
    if (selectedTodoId) return Todo.getById(selectedTodoId, todos);
  }, [selectedTodoId]);

  useEffect(() => {
    (async () => {
      const response = await PostService.getAllTodos(10);

      const data = (await response.json()) as ITodo[];

      const convertedData = Todo.convertServerTodos(data);

      setTodos(convertedData);
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
