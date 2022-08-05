import React, {
  CSSProperties,
  FC,
  forwardRef,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PostService from "../api/PostService";
import useDrag from "../hooks/useDrag";
import useResize from "../hooks/useResize";
import { ICoords, ITodo, Todo } from "../types/types";
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
  size: CSSProperties;
}

// const { innerHeight, innerWidth } = window;
// const startingPosition = { x: 100, y: 0 };

const TodoList: FC<TodoListProps> = ({
  todos,
  setTodos,
  selectedTodoId,
  setSelectedTodoId,
  size,
}) => {
  const [query, setQuery] = useState("");

  const foundTodos = useMemo(() => {
    return filterTodo(query, todos);
  }, [query, todos]);

  return (
    <>
      <section
        className={cl.todoList}
        style={{
          ...size,
        }}
      >
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
                  searchQuery={query}
                />
              );
            })}
          </div>
        </div>
        <NewTodoForm addNewTodo={addNewTodo} />
      </section>
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
