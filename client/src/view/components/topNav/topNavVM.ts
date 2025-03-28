import { useState } from "react";

const useTopNav = () => {
    const [ isRegistered, setIsRegistered ] = useState<boolean>(false);

    return {
        isRegistered,
        setIsRegistered,
    };
}

export default useTopNav;