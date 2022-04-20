import { createContext, useContext } from "react";

export const AuthContext = createContext();

//This is the hook we will use
export function useAuth() {
  //it will pull whatever data it finds in the AuthContext
  return useContext(AuthContext);
}
