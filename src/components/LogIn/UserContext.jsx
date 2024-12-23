import React, { createContext, useState, useEffect } from "react";

//crear el contexto
export const UserContext = createContext();

//proveedor
export const UserProvider = ({ children }) => {
  // Estado del usuario, que se guardará en localStorage o sessionStorage
  const [user, setUser] = useState(null);
  //const navigate = useNavigate();
  //cargar datos del usuario desde localStorage
  useEffect(() => {
    const storedUser =
      sessionStorage.getItem("user") || localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  //handlers
  //iniciar sesion
  const handleLogin = (userData) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData)); //guardamos en sessionStorage
    localStorage.setItem("user", JSON.stringify(userData)); // guardamos en localStorage
  };

  //cerrar sesion
  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem("user"); //eliminamos de sessionStorage
    localStorage.removeItem("user"); //eliminamos de localStorage
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
