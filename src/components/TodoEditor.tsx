import React, {
  ChangeEvent,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ITodo, Status, Todo } from "../types/types";
import StatusButtons from "./StatusButtons";
import cl from "./TodoEditor.module.css";

interface EditTodoFormProps {
  todoId: number | null;
  setTodoId: (todos: SetStateAction<number | null>) => void;
  todos: Todo[];
  setTodos: (todos: SetStateAction<Todo[]>) => void;
}

const EditTodoForm: FC<EditTodoFormProps> = ({
  todoId,
  setTodoId,
  todos,
  setTodos,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<Status | null>(null);

  const todo = useMemo(() => {
    if (todoId) return Todo.getById(todoId, todos);
  }, [todoId]);

  useEffect(() => {
    resetForm();
  }, [todo]);

  const tip = <span>(pick any todo)</span>;

  return (
    <section className={cl.editTodoForm}>
      <div className={cl.controls}>
        <h3>Editing {!todo && tip}</h3>
        <button disabled={!todo} className={cl.deleteBtn} onClick={deleteTodo}>
          Delete
        </button>
      </div>
      <input
        disabled={!todo}
        type="text"
        className={cl.titleInput}
        value={title}
        onChange={editTitle}
      />
      <textarea
        disabled={!todo}
        className={cl.bodyTextarea}
        value={body}
        onChange={editBody}
      ></textarea>
      <div className={cl.controls}>
        <button disabled={!status} className={cl.cancelBtn} onClick={resetForm}>
          Cancel
        </button>
        <StatusButtons status={status} setStatus={setStatus} />
        <button
          disabled={!status}
          className={cl.doneBtn}
          onClick={finishEditing}
        >
          Done
        </button>
      </div>
    </section>
  );

  function editTitle(ev: ChangeEvent<HTMLInputElement>) {
    setTitle(ev.target.value);
  }

  function editBody(ev: ChangeEvent<HTMLTextAreaElement>) {
    setBody(ev.target.value);
  }

  function resetForm() {
    if (todo) {
      setTitle(todo.title);
      setBody(todo.body);
      setStatus(todo.status);
    } else {
      setTitle("");
      setBody("");
      setStatus(null);
    }
  }

  function finishEditing() {
    if (!todo) return;
    // const editedTodo = Todo.getById(todoId, todos)

    todo.title = title;
    todo.body = body;
    todo.status = status || todo.status;

    setTodos([...todos]);
  }

  function deleteTodo() {
    if (!todoId) return;

    Todo.deleteById(todoId, todos);
    setTodos([...todos]);
    setTodoId(null);
  }
};

export default EditTodoForm;
