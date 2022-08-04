import React, { FC } from "react";
import { Status, Todo } from "../types/types";
import cl from "./StatusButtons.module.css";

interface ControlButtonsProps {
  status: Status | null;
  setStatus: (status: Status) => void;
}

const ControlButtons: FC<ControlButtonsProps> = ({ status, setStatus }) => {
  const statusBtnsClasses = [
    [cl.waitingBtn, status === "waiting" ? cl.picked : ""].join(" "),
    [cl.processingBtn, status === "processing" ? cl.picked : ""].join(" "),
    [cl.completedBtn, status === "completed" ? cl.picked : ""].join(" "),
  ];

  return (
    <div className={cl.statusBtns}>
      <button
        disabled={!status}
        className={statusBtnsClasses[0]}
        onClick={() => setStatus("waiting")}
      >
        Waiting
      </button>
      <button
        disabled={!status}
        className={statusBtnsClasses[1]}
        onClick={() => setStatus("processing")}
      >
        Processing
      </button>
      <button
        disabled={!status}
        className={statusBtnsClasses[2]}
        onClick={() => setStatus("completed")}
      >
        Completed
      </button>
    </div>
  );
};

export default ControlButtons;
