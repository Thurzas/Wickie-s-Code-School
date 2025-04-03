import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import CourseDetailCard from "../Course/CourseDetailCard";
import EditCourseCard from "../Course/EditCourseCard";
import Wanted from "../Wanted/Wanted";
import { useModal } from "./ModalContext";

export type Course = {
  id: number;
  title: string;
  image: string;
  corpus: string;
  is_active: boolean;
  type: string;
  topic: string;
  reward: number;
};

interface CourseContextType {
  courses: Course[];
  editCourse: (Course: Course) => void;
  addCourse: () => void;
  deleteCourse: (CourseId: number) => void;
  updateData: () => void;
  showCourse: (Course: Course) => void;
  showCourseModal: (Course: Course) => void;
  confirmDeleteCourse: (CourseId: number) => void;
}

const CoursesContext = createContext<CourseContextType | undefined>(undefined);

export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error("useCourses doit être utilisé dans un CoursesProvider");
  }
  return context;
};

export const CoursesProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const { openModal } = useModal();
  const navigate = useNavigate(); // <-- Ajout du hook useNavigate
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/courses`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      });
  }, []);

  const editCourse = (Course: Course) => {
    openModal(
      "edit",
      <Wanted>
        <EditCourseCard data={Course} />
      </Wanted>,
    );
  };

  const addCourse = () => {};

  const deleteCourse = (CourseId: number) => {
    console.info(CourseId);
  };

  const updateData = () => {};

  const showCourse = (Course: Course) => {
    console.info(Course.id);
    navigate(`/courses/${Course.id}`, { state: { from: location.pathname } });
  };
  const showCourseModal = (Course: Course) => {
    openModal(
      "edit",
      <Wanted>
        <CourseDetailCard data={Course} />
      </Wanted>,
    );
  };

  const confirmDeleteCourse = (CourseId: number) => {
    console.info(CourseId);
  };
  return (
    <CoursesContext.Provider
      value={{
        courses,
        editCourse,
        addCourse,
        deleteCourse,
        updateData,
        showCourse,
        showCourseModal,
        confirmDeleteCourse,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};
