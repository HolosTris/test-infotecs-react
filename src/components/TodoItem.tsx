import React, { FC } from "react";
import { ITodo } from "../types/types";
import cl from "./TodoItem.module.css";

interface TodoItemProps {
  todo: ITodo;
  selectedTodoId: number | undefined;
  setSelectedTodoId: (todos: number) => void;
}

const TodoItem: FC<TodoItemProps> = ({
  todo,
  selectedTodoId,
  setSelectedTodoId,
}) => {
  return (
    <button
      className={[
        cl.todoItem,
        todo.id === selectedTodoId ? cl.picked : "",
      ].join(" ")}
      onClick={pickTodo}
    >
      {/* <input type="checkbox" checked={todo.completed} /> */}
      <span>{todo.title}</span>
    </button>
  );

  function pickTodo() {
    setSelectedTodoId(todo.id);
  }
};

export default TodoItem;
