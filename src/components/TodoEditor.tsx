import React, { FC } from "react";
import { ITodo, Todo } from "../types/types";
import cl from "./TodoEditor.module.css";

interface EditTodoFormProps {
  todo?: Todo;
}

const EditTodoForm: FC<EditTodoFormProps> = ({ todo }) => {
  const tip = <span>(pick any todo)</span>;

  const statusBtnsClasses = [
    [cl.waitingBtn, todo?.status === "waiting" ? cl.picked : ""].join(" "),
    [cl.processingBtn, todo?.status === "processing" ? cl.picked : ""].join(
      " "
    ),
    [cl.completedBtn, todo?.status === "completed" ? cl.picked : ""].join(" "),
  ];

  return (
    <section className={cl.editTodoForm}>
      <div className={cl.controls}>
        <h3>Editing {!todo && tip}</h3>
        <button className={cl.deleteBtn}>Delete</button>
      </div>
      <input type="text" className={cl.titleInput} value={todo?.title} />
      <textarea className={cl.bodyTextarea} value={todo?.body}></textarea>
      <div className={cl.controls}>
        <div className={cl.statusBtns}>
          <button className={statusBtnsClasses[0]}>Waiting</button>
          <button className={statusBtnsClasses[1]}>Processing</button>
          <button className={statusBtnsClasses[2]}>Completed</button>
        </div>
        <button className={cl.doneBtn}>Done</button>
      </div>
    </section>
  );
};

export default EditTodoForm;
