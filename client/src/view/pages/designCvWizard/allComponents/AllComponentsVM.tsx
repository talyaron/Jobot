import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

export const useAllComponentsVM = () => {
  const [isCvFill, setIsCvFill] = useState(false);
  const cvForm = useSelector((state: RootState) => state.cvForm);

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
