import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../../../redux/store'
import { 
    addServiceType, 
    updateServiceType, 
    removeServiceType 
} from '../../../../redux/cv/cvSlice'

import styles from "./serviceType.module.scss";

const ServiceType: React.FC = () => {
    const dispatch = useDispatch();
    const serviceTypes = useSelector((state: RootState) => state.cvForm.serviceTypes);

    const handleAddService = () => {
        dispatch(addServiceType());
    };

    const handleUpdateService = (id: string, field: string, value: string) => {
        dispatch(updateServiceType({ id, data: { [field]: value } }));
    };

    const handleRemoveService = (id: string) => {
        dispatch(removeServiceType(id));
    };
    console.log("the servier types componnet :" , serviceTypes)

    return (
        <div className={styles.continer}>
            <h2>סוגי שירות</h2>
            <button onClick={handleAddService}>➕ הוסף שירות</button>

            {serviceTypes.map((service) => (
                <div key={service.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                    <label>סוג שירות:</label>
                    <input 
                        type="text" 
                        value={service.serviceType} 
                        onChange={(e) => handleUpdateService(service.id, "serviceType", e.target.value)} 
                    />

                    <label>שם ארגון:</label>
                    <input 
                        type="text" 
                        value={service.organizationName} 
                        onChange={(e) => handleUpdateService(service.id, "organizationName", e.target.value)} 
                    />

                    <label>שנות שירות:</label>
                    <input 
                        type="text" 
                        value={service.serviceYears} 
                        onChange={(e) => handleUpdateService(service.id, "serviceYears", e.target.value)} 
                    />

                    <button onClick={() => handleRemoveService(service.id)}>🗑️ מחק</button>
                </div>
            ))}
        </div>
    );
};

export default ServiceType;
