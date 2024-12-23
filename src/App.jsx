import "./App.css";
import Home from "./pages/Home";
import DrawerExample from "./components/Layout/SideBar/SideBar";
import { UserProvider } from "./components/LogIn/UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useContext } from "react";
import { UserContext } from "./components/LogIn/UserContext";

// Componente para proteger las rutas
const PrivateRoute = ({ element: Element }) => {
  const { user } = useContext(UserContext);
  return user ? <Element /> : <LoginPage />; // Si el usuario está autenticado, mostramos el componente; si no, redirigimos al Login
};

const App = () => {
  return (
    <Router>
      <UserProvider>
        <DrawerExample />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute element={Home} />} />{" "}
          {/* Ruta protegida */}
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
