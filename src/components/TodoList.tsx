import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import PostService from "../api/PostService";
import { ITodo, Todo } from "../types/types";
import { isOverflown } from "../utils/utils";
import NewTodoForm from "./NewTodoForm";
import SearchForm from "./SearchForm";
import TodoItem from "./TodoItem";
import cl from "./TodoList.module.css";
import WidthChanger from "./WidthChanger";

interface TodoListProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  selectedTodoId: number | null;
  setSelectedTodoId: (todos: number) => void;
}

const TodoList: FC<TodoListProps> = ({
  todos,
  setTodos,
  selectedTodoId,
  setSelectedTodoId,
}) => {
  const [query, setQuery] = useState("");

  // const [isScrollable, setIsScrollable] = useState(false);

  // const isOverflownRef = useRef(false);

  const sectionRef = useRef<HTMLElement>(null);

  const [sectionWidth, setSectionWidth] = useState<number>();

  // useEffect(() => {
  //   console.log(sectionRef.current);

  //   if (!sectionRef.current) return;
  //   console.log(sectionWidth);

  //   if (!sectionWidth) setSectionWidth(sectionRef.current.offsetWidth);
  //   else {
  //     sectionRef.current.style.width = sectionWidth + "px";
  //   }
  // }, [sectionWidth, sectionRef.current?.offsetWidth]);

  // useEffect(() => {
  //   if (sectionRef.current && isOverflown(sectionRef.current))
  //     isOverflownRef.current = true;
  //   else isOverflownRef.current = false;
  // }, [sectionRef.current?.scrollHeight]);

  const foundTodos = useMemo(() => {
    return filterTodo(query, todos);
  }, [query, todos]);

  return (
    <>
      <section ref={sectionRef} className={cl.todoList}>
        <div className={cl.todoCon}>
          <SearchForm query={query} setQuery={setQuery} />
          <div>
            {query && <div className={cl.searchTip}>Search result:</div>}
            {foundTodos.map((todo) => {
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
        </div>
        <NewTodoForm addNewTodo={addNewTodo} />
      </section>
      {/* <WidthChanger setWidth={setSectionWidth} /> */}
    </>
  );

  function addNewTodo(newTodo: Todo) {
    setTodos([...todos, newTodo]);
  }

  function filterTodo(query: string, todos: Todo[]) {
    if (!query) return todos;

    return todos.filter((todo) => todo.title.includes(query));
  }
};

export default TodoList;
