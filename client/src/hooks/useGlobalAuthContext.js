import { useContext } from "react";
import { AuthContext } from "../context/AuthCOntext";

export const useGlobalAuthContext = () => {
    return useContext(AuthContext);
};