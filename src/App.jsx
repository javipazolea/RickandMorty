import "./App.css";
import Home from "./pages/Home";
import DrawerExample from "./components/Layout/SideBar/SideBar";
import { UserProvider } from "./components/LogIn/UserContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import { useContext } from "react";
import { UserContext } from "./components/LogIn/UserContext";
import { SnackbarProvider } from "notistack";
import RegisterPage from "./pages/RegisterPage";

// Componente para proteger las rutas
const PrivateRoute = ({ element: Element }) => {
  const { user } = useContext(UserContext);
  return user ? <Element /> : <LoginPage />; // Si el usuario está autenticado, mostramos el componente; si no, redirigimos al Login
};

const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <UserProvider>
          <DrawerExample />
          <Routes>
            {/* Ruta protegida */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<PrivateRoute element={Home} />} />{" "}
          </Routes>
        </UserProvider>
      </Router>
    </SnackbarProvider>
  );
};

export default App;
