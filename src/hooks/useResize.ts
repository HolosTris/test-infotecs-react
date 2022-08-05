import { CSSProperties, MouseEvent, useState } from "react";

interface ISizeParams {
  height?: number;
  width?: number;
  minHeight?: number;
  minWidth?: number;
  maxHeight?: number;
  maxWidth?: number;
}

function useResize(
  params: ISizeParams
): [
  CSSProperties,
  (event: MouseEvent) => void,
  (event: MouseEvent) => void,
  (event: MouseEvent) => void
] {
  const { height, width, minHeight, minWidth, maxHeight, maxWidth } = params;

  const [dragInfo, setDragInfo] = useState({
    isDragging: false,
    origin: { x: 0, y: 0 },
    size: { height: height, width: width },
    lastSize: { height: height, width: width },
  });

  const { isDragging } = dragInfo;
  const handleMouseDown = ({ clientX, clientY, target }: MouseEvent) => {
    // if (!isDragging && target === targetElem)
    if (!isDragging)
      setDragInfo({
        ...dragInfo,
        isDragging: true,
        origin: { x: clientX, y: clientY },
      });
  };

  const handleMouseMove = ({ clientX, clientY, target }: MouseEvent) => {
    if (isDragging) {
      const { origin, lastSize, size } = dragInfo;

      if (lastSize.height) {
        const newHeight = clientY - (origin.y - lastSize.height);

        size.height =
          maxHeight && newHeight > maxHeight
            ? maxHeight
            : minHeight && newHeight < minHeight
            ? minHeight
            : newHeight;
      }

      if (lastSize.width) {
        const newWidth = clientX - (origin.x - lastSize.width);

        size.width =
          maxWidth && newWidth > maxWidth
            ? maxWidth
            : minWidth && newWidth < minWidth
            ? minWidth
            : newWidth;
      }

      // console.log(clientX, origin.x, newWidth, lastSize.width);

      setDragInfo({ ...dragInfo });
    }
  };

  const handleMouseUp = ({ target }: MouseEvent) => {
    if (isDragging) {
      const { size } = dragInfo;
      setDragInfo({
        ...dragInfo,
        isDragging: false,
        lastSize: { width: size.width, height: size.height },
      });
    }
  };

  const elementSize: CSSProperties = {
    // position: "absolute",
  };

  minHeight && (elementSize.maxHeight = `${minHeight}px`);

  minWidth && (elementSize.maxWidth = `${minWidth}px`);

  if (dragInfo.size.height) {
    // elementSize.height = `${dragInfo.size.height}px`;
    elementSize.minHeight = `${dragInfo.size.height}px`;
  }

  if (dragInfo.size.width) {
    // elementSize.width = `${dragInfo.size.width}px`;
    elementSize.minWidth = `${dragInfo.size.width}px`;
  }

  return [elementSize, handleMouseDown, handleMouseMove, handleMouseUp];
}

export default useResize;
