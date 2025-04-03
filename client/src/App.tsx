import { Outlet } from "react-router";
import "./App.css";
import { CoursesProvider } from "./components/Contexts/CourseContext";
import { ModalProvider } from "./components/Contexts/ModalContext";
import { PersonsProvider } from "./components/Contexts/PersonContext";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <ModalProvider>
        <Navbar />
        <PersonsProvider>
          <CoursesProvider>
            <Outlet />
          </CoursesProvider>
        </PersonsProvider>
        <Footer />
      </ModalProvider>
    </>
  );
}

export default App;
