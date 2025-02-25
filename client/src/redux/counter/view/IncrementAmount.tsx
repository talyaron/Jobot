import { useDispatch } from "react-redux";
import { incrementByAmount } from "../counterSlice";
import { useRef } from "react";

const IncrementAmount = () => {
  const dispatch = useDispatch();
  const ref = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (ref.current) {
      const value = Number(ref.current.value) || 0;
      dispatch(incrementByAmount(value));
    }
  }
  return (
    <div>
      <input placeholder ="number" type="number" ref={ref} />
      <br />
      <button onClick={handleClick}>increment by</button>
    </div>
  );
};

export default IncrementAmount;
