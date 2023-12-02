import { forwardRef } from "react";

const ResizeHandle = forwardRef(function CustomResizeHandle(
  props: unknown,
  ref: unknown,
) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { handleAxis, ...restProps } = props;
  return (
    <span
      ref={ref}
      className={`handle-${handleAxis} react-resizable-handle react-resizable-handle-se z-20`}
      {...restProps}
    ></span>
  );
});

export default ResizeHandle;
