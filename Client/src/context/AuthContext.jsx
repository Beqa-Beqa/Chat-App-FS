import { createContext, useCallback, useState } from "react";
import { postRequest, baseUrl } from "../utils/services";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem("User")) || null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loginError, setLoginError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, [])

  const registerUser = useCallback(async (e) => {
    e.preventDefault();
    setIsRegisterLoading(true);
    setRegisterError(null)

    const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));
    setIsRegisterLoading(false);
    if(response.error) return setRegisterError(response);

    window.localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  }, [registerInfo]);

  const logoutUser = useCallback(() => {
    window.localStorage.removeItem("User");
    setUser(null);
  }, []);

  const loginUser = useCallback(async (e) => {
    e.preventDefault();

    setIsLoginLoading(true);
    setLoginError(null);

    const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));
    setIsLoginLoading(false);

    if(response.error) return setLoginError(response);

    setUser(response);
    window.localStorage.setItem("User", JSON.stringify(response));    
  }, [loginInfo]);

  return <AuthContext.Provider value={{
    user,
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
    logoutUser,
    loginUser,
    loginError,
    loginInfo,
    updateLoginInfo,
    isLoginLoading
  }}>
    {children}
  </AuthContext.Provider>
}

AuthContextProvider.propTypes = {
  children: PropTypes.any
}

export default AuthContextProvider;