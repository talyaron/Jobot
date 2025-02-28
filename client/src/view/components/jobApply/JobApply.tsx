import React from "react";
import { useJobApplyVM } from "./JobApplyVM";

const JobApply: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { handelApply } = useJobApplyVM();
  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-container">
          <h2 className="text-xl font-bold mb-4">Apply for the Job</h2>
          <form>
            <label className="block mb-2">
              FullName:
              <input name="fullName" type="text" className="input-field" />
            </label>
            <label className="block mb-2">
              Email:
              <input name="email" type="email" className="input-field" />
            </label>
            <button
              onSubmit={handelApply}
              type="submit"
              className="submit-button"
            >
              Submit
            </button>
          </form>
          <button onClick={onClose} className="close-button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobApply;
