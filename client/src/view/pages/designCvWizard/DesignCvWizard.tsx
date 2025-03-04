import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import AllComponents from "./allComponents/AllComponents";

const DesignCvWizard = () => {
  return (
    <Provider store={store}>
      <AllComponents /> 
    </Provider>
  );
};

export default DesignCvWizard;
