import react from "react";
import jwtDefaultConfig from "../auth/jwt/jwtDefaultConfig";

export const isUserLoggedIn = () => {
  return (
    localStorage.getItem("userData") &&
    localStorage.getItem(jwtDefaultConfig.storageTokenKeyName)
  );
};
