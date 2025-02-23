import React from "react";
import styles from "./serviceType.module.scss";
import { useServiceTypeVM } from "./serviceTypeVM";

const ServiceType = () => {
    const { 
        serviceData, 
        setServiceData,
        editingIndexService, 
        setEditingIndexService,
        formDataService, 
        setFormDataService 
    } = useServiceTypeVM();

    const resetForm = () => {
        setFormDataService({
            serviceType: "",
            organizationName: "",
            serviceYears: ""
        });
        setEditingIndexService(null);
    };

    const handleServiceChange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const serviceType = formData.get("serviceType") as string;
        const organizationName = formData.get("organizationName") as string;
        const serviceYears = formData.get("serviceYears") as string;

        if (editingIndexService !== null) {
            setServiceData((prev) => {
                const newData = [...prev];
                newData[editingIndexService] = { serviceType, organizationName, serviceYears };
                return newData;
            });
        } else {
            setServiceData((prev) => [...prev, { serviceType, organizationName, serviceYears }]);
        }

        resetForm();
    };

    const handleServiceDelete = (index: number) => {
        setServiceData((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    };

    const handleServiceEdit = (index: number) => {
        const service = serviceData[index];
        setFormDataService({
            serviceType: service.serviceType,
            organizationName: service.organizationName,
            serviceYears: service.serviceYears
        });
        setEditingIndexService(index);
    };

    return (
        <div className={styles.continer}>
            <form onSubmit={handleServiceChange}>
                <h2>סוגי שירות</h2>
                <label htmlFor="serviceType">סוג שירות:</label>
                <input 
                    type="text" 
                    id="serviceType" 
                    name="serviceType" 
                    value={formDataService.serviceType}
                    onChange={(e) => setFormDataService({ ...formDataService, serviceType: e.target.value })}
                    required
                />
                <br />
                <label htmlFor="organizationName">שם הארגון:</label>
                <input 
                    type="text" 
                    id="organizationName" 
                    name="organizationName"
                    value={formDataService.organizationName}
                    onChange={(e) => setFormDataService({ ...formDataService, organizationName: e.target.value })}
                    required
                />
                <br />
                <label htmlFor="serviceYears">תקופת השירות בשנים:</label>
                <input 
                    type="text" 
                    id="serviceYears" 
                    name="serviceYears"
                    value={formDataService.serviceYears}
                    onChange={(e) => setFormDataService({ ...formDataService, serviceYears: e.target.value })}
                    required
                />
                <br /><br />
                <button type="submit">
                    {editingIndexService !== null ? 'ערוך שירות' : 'הוסף שירות'}
                </button>
                {editingIndexService !== null && (
                    <button type="button" onClick={resetForm}>ביטול</button>
                )}
            </form>
            <div>
                {serviceData.map((service, index) => (
                    <div key={index}>
                        <h4>סוג שירות: {service.serviceType}</h4>
                        <p>שם הארגון: {service.organizationName}</p>
                        <p>תקופת השירות: {service.serviceYears}</p>
                        <button onClick={() => handleServiceDelete(index)}>מחק</button>
                        <button onClick={() => handleServiceEdit(index)}>ערוך</button>
                        <p>--------------------------</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceType;