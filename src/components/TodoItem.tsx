import React, { FC, useEffect, useRef } from "react";
import { IServerTodo, Todo } from "../types/types";
import { cutContent } from "../utils/utils";
import cl from "./TodoItem.module.css";

interface TodoItemProps {
  todo: Todo;
  selectedTodoId: number | null;
  setSelectedTodoId: (todos: number) => void;
  searchQuery: string;
}

const TodoItem: FC<TodoItemProps> = ({
  todo,
  selectedTodoId,
  setSelectedTodoId,
  searchQuery,
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
      <span className={indicatorClasses}></span>
      <span>{searchQuery ? highlightFounded(todo.title) : todo.title}</span>
    </button>
  );

  function pickTodo() {
    setSelectedTodoId(todo.id);
  }

  function highlightFounded(text: string) {
    const iFound = text.toLowerCase().indexOf(searchQuery.toLowerCase());

    if (!~iFound) return text;

    const textBeforeElem = highlightFounded(text.slice(0, iFound));
    const foundText = text.slice(iFound, iFound + searchQuery.length);
    const textAfterElem = highlightFounded(
      text.slice(iFound + searchQuery.length)
    );

    const highlightTextElem = <span className={cl.highlight}>{foundText}</span>;

    return (
      <React.Fragment>
        {textBeforeElem}
        {highlightTextElem}
        {textAfterElem}
      </React.Fragment>
    );
  }
};

export default TodoItem;
