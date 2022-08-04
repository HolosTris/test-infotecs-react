import React, { FC, useEffect, useRef } from "react";
import { ITodo, Todo } from "../types/types";
import { cutContent } from "../utils/utils";
import cl from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  selectedTodoId: number | null;
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

  // const titleText =

  // const titleTextRef = useRef(todo.title);

  // const titleSpanRef = useRef<HTMLSpanElement>(null);

  // useEffect(() => {
  //   if (titleSpanRef.current)
  //     titleTextRef.current = cutContent(titleSpanRef.current);
  // }, []);

  return (
    <button className={btnClasses} onClick={pickTodo}>
      <span className={indicatorClasses}></span>
      {/* <span ref={titleSpanRef}>{titleTextRef.current}</span> */}
      <span>{todo.title}</span>
    </button>
  );

  function pickTodo() {
    setSelectedTodoId(todo.id);
  }
};

export default TodoItem;
