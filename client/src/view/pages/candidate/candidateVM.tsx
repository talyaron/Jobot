
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

export function useCandidateVM() {
  const isCandidate = useSelector((state: RootState) => state.user.isCandidate);
  const [showLogin, setShowLogin] = useState(!isCandidate);

  return { isCandidate, showLogin, setShowLogin}
}