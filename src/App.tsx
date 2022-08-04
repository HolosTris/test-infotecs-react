import React, { useEffect, useMemo, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoEditor from "./components/TodoEditor";
import PostService from "./api/PostService";
import { ITodo, Todo } from "./types/types";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const response = await PostService.getAllTodos(20);

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
      <TodoEditor
        todoId={selectedTodoId}
        setTodoId={setSelectedTodoId}
        todos={todos}
        setTodos={setTodos}
      />
    </main>
  );
}

export default App;
