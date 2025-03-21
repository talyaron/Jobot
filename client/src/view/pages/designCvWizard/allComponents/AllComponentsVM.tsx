import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../../redux/store";
import { fetchCvForm } from "../../../../redux/cv/cvSlice"; // ייבוא הפעולה

export const useAllComponentsVM = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isCvFill, setIsCvFill] = useState(false);
  const cvForm = useSelector((state: RootState) => state.cvForm);

  useEffect(() => {
    dispatch(fetchCvForm()); // שליחת בקשה לשרת כדי למשוך את הנתונים
  }, [dispatch]); // מופעל פעם אחת כשהקומפוננטה עולה

  useEffect(() => {
    foundIfCvFill();
  }, [cvForm]);

  function foundIfCvFill() {
    const isPersonalInformattionFill =
      cvForm.personalInformation.firstName !== "" ||
      cvForm.personalInformation.lastName !== "" ||
      cvForm.personalInformation.city !== "" ||
      cvForm.personalInformation.email !== "" ||
      cvForm.personalInformation.phoneNumber !== "";

    const hasOtherDetails =
      cvForm.educations.length > 0 ||
      cvForm.skills.length > 0 ||
      cvForm.professionalSummary.length > 0 ||
      cvForm.serviceType.length > 0 ||
      cvForm.workExperience.length > 0;

    setIsCvFill(isPersonalInformattionFill || hasOtherDetails);
  }

  return { isCvFill };
};
