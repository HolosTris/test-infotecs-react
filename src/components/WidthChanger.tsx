import React, {
  ComponentProps,
  DragEvent,
  FC,
  forwardRef,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ICoords } from "../types/types";
import cl from "./WidthChanger.module.css";

interface WidthChangerProps {
  // coords: ICoords;
  // setCoords: (width: SetStateAction<ICoords>) => void;
  mouseDownHandler: (event: MouseEvent) => void;
}

const WidthChanger: FC<WidthChangerProps> = ({
  // coords,
  // setCoords,
  mouseDownHandler,
}) => {
  return (
    <div className={cl.changer} onMouseDown={mouseDownHandler}>
      <div className={cl.line}></div>
    </div>
  );
};
export default WidthChanger;
