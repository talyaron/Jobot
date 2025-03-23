import React, { useState, useEffect } from "react";
import { useJobApplyVM } from "./JobApplyVM";

const JobApply: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { handelApply, checkIfLoggedIn } = useJobApplyVM();
    const [message, setMessage] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const loggedIn = await checkIfLoggedIn();
            setIsLoggedIn(loggedIn);
        };
        checkAuth();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handelApply(e, message);
        onClose();
    };

    if (!isLoggedIn) {
        return (
            <div className="modal-overlay">
                <div className="modal-container">
                    <h2 className="text-xl font-bold mb-4">Login Required</h2>
                    <p>You need to be logged in to apply for this job.</p>
                    <button onClick={onClose} className="close-button">Close</button>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="modal-overlay">
                <div className="modal-container">
                    <h2 className="text-xl font-bold mb-4">Apply for the Job</h2>
                    <form onSubmit={handleSubmit}>
                        <label className="block mb-2">
                            Message to Employer:
                            <textarea 
                                name="messageToEmployer" 
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="input-field w-full" 
                                rows={4}
                            />
                        </label>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                    <button onClick={onClose} className="close-button">Close</button>
                </div>
            </div>
        </div>
    );
};

export default JobApply;