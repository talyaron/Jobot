import { useRef } from "react";

const JobInputBoxVm = () => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleSubmit = () => {
    if (textAreaRef.current === null) return;
    const message = textAreaRef.current.value;
    console.log("Message:", message);
  };
  return ({ textAreaRef, handleSubmit });
};

export default JobInputBoxVm;
