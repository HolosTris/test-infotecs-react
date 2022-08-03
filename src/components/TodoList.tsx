import React, { FC, useEffect, useState } from "react";
import PostService from "../api/PostService";
import { ITodo } from "../types/types";
import NewTodoForm from "./NewTodoForm";
import TodoItem from "./TodoItem";
import cl from "./TodoList.module.css";

interface TodoListProps {
  todos: ITodo[];
  setTodos: (todos: ITodo[]) => void;
  selectedTodoId: number | undefined;
  setSelectedTodoId: (todos: number) => void;
}

const TodoList: FC<TodoListProps> = ({
  todos,
  setTodos,
  selectedTodoId,
  setSelectedTodoId,
}) => {
  return (
    <section className={cl.todoList}>
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

  function addNewTodo(newTodo: ITodo) {
    setTodos([...todos, newTodo]);
  }
};

export default TodoList;
