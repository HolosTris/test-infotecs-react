import React, { useEffect, useMemo, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import TodoList from "./components/TodoList";
import TodoEditor from "./components/TodoEditor";
import PostService from "./api/PostService";
import { ITodo, Todo } from "./types/types";
import useResize from "./hooks/useResize";
import WidthChanger from "./components/WidthChanger";

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

  const [todoListSize, handleMouseDown, handleMouseMove, handleMouseUp] =
    useResize({ minWidth: 150, width: 200, maxWidth: 400 });

  return (
    <main
      className="App"
      // onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <TodoList
        todos={todos}
        setTodos={setTodos}
        selectedTodoId={selectedTodoId}
        setSelectedTodoId={setSelectedTodoId}
        size={todoListSize}
      />
      <WidthChanger mouseDownHandler={handleMouseDown} />
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
