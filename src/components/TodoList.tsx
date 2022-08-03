import React, { FC, useEffect, useRef, useState } from "react";
import PostService from "../api/PostService";
import { ITodo, Todo } from "../types/types";
import { isOverflown } from "../utils/utils";
import NewTodoForm from "./NewTodoForm";
import TodoItem from "./TodoItem";
import cl from "./TodoList.module.css";

interface TodoListProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  selectedTodoId: number | undefined;
  setSelectedTodoId: (todos: number) => void;
}

const TodoList: FC<TodoListProps> = ({
  todos,
  setTodos,
  selectedTodoId,
  setSelectedTodoId,
}) => {
  const [isScrollable, setIsScrollable] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current && isOverflown(sectionRef.current))
      setIsScrollable(true);
    else setIsScrollable(false);
  }, [sectionRef.current?.scrollHeight]);

  return (
    <section
      ref={sectionRef}
      className={[cl.todoList, isScrollable ? cl.withScroll : ""].join(" ")}
    >
      <NewTodoForm addNewTodo={addNewTodo} />
      <div className={cl.todoCon}>
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              selectedTodoId={selectedTodoId}
              setSelectedTodoId={setSelectedTodoId}
            />
          );
        })}
      </div>
    </section>
  );

  function addNewTodo(newTodo: Todo) {
    setTodos([...todos, newTodo]);
  }
};

export default TodoList;
