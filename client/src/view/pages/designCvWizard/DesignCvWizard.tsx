import React from "react";
import { Provider } from "react-redux";
import { store } from "../../../redux/store";
import AllComponents from "./allComponents/AllComponents";

const DesignCvWizard = () => {
  return (
    <Provider store={store}>
      <AllComponents /> {/* קומפוננטה פנימית שעכשיו יכולה להשתמש ב- useSelector */}
    </Provider>
  );
};

export default DesignCvWizard;
