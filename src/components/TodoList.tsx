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
import { Todo } from "../types/types";
import NewTodoForm from "./NewTodoForm";
import SearchForm from "./SearchForm";
import TodoItem from "./TodoItem";
import cl from "./TodoList.module.css";

interface TodoListProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  selectedTodoId: number | null;
  setSelectedTodoId: (todos: number) => void;
}

const TodoList = forwardRef<HTMLElement, TodoListProps>(
  ({ todos, setTodos, selectedTodoId, setSelectedTodoId }, sectionRef) => {
    const [searchQuery, setSearchQuery] = useState("");

    // Фильтруем все todo согласно поисковому запросу и кешируем получившийся список
    const foundTodos = useMemo(() => {
      return filterTodo(searchQuery, todos);
    }, [searchQuery, todos]);

    return (
      <section ref={sectionRef} className={cl.todoList}>
        <div className={cl.todoCon}>
          <SearchForm query={searchQuery} setQuery={setSearchQuery} />
          <div>
            {searchQuery && <div className={cl.searchTip}>Search result:</div>}
            {foundTodos.map((todo) => {
              return (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  selectedTodoId={selectedTodoId}
                  setSelectedTodoId={setSelectedTodoId}
                  searchQuery={searchQuery}
                />
              );
            })}
          </div>
        </div>
        <NewTodoForm addNewTodo={addNewTodo} />
      </section>
    );

    function addNewTodo(newTodo: Todo) {
      setTodos([...todos, newTodo]);
    }

    function filterTodo(query: string, todos: Todo[]) {
      if (!query) return todos;

      return todos.filter((todo) => todo.title.includes(query));
    }
  }
);

export default TodoList;
