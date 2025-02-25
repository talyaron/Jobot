import { useDispatch } from 'react-redux'
import { decrement } from '../counterSlice';

const DecreaseButton = () => {
    const dispatch = useDispatch();

    function handleDecrement(){
        dispatch(decrement())
    }
  return (
   <button onClick={handleDecrement}>decrement</button>
  )
}

export default DecreaseButton
