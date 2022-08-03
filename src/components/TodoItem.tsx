import React, { FC } from "react";
import { ITodo, Todo } from "../types/types";
import cl from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  selectedTodoId: number | undefined;
  setSelectedTodoId: (todos: number) => void;
}

const TodoItem: FC<TodoItemProps> = ({
  todo,
  selectedTodoId,
  setSelectedTodoId,
}) => {
  const statusClass =
    todo.status === "waiting"
      ? cl.waiting
      : todo.status === "processing"
      ? cl.processing
      : cl.completed;
  const indicatorClasses = [cl.indicator, statusClass].join(" ");
  const btnClasses = [
    cl.todoItem,
    todo.id === selectedTodoId ? cl.picked : "",
  ].join(" ");

  return (
    <button className={btnClasses} onClick={pickTodo}>
      <span className={indicatorClasses}>● </span>
      <span>{todo.title}</span>
    </button>
  );

  function pickTodo() {
    setSelectedTodoId(todo.id);
  }
};

export default TodoItem;
