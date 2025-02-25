import { useDispatch } from 'react-redux'
import { increment } from '../counterSlice';

const AddButton = () => {
    const dispatch = useDispatch();

    function handleAdd(){
        dispatch(increment())
    }
  return (
   <button onClick={handleAdd}>Add</button>
  )
}

export default AddButton
