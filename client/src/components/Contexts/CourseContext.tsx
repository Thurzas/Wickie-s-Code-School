import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router";
import CourseCard from "../Course/CourseCard";
import CourseDetailCard from "../Course/CourseDetailCard";
import SimpleDamagedPaper from "../Wanted/SimpleDamagedPaper";
import { useModal } from "./ModalContext";

export type Course = {
  topic_id: number;
  id_category: number;
  id: number;
  title: string;
  image: string;
  corpus: string;
  is_active: boolean;
  type: string;
  topic: string;
  reward: number;
};
export type Topic = {
  id: number;
  name: string;
  image: string;
};

export type Category = {
  id: number;
  name: string;
};

interface CourseContextType {
  courses: Course[];
  topics: Topic[];
  types: Category[];
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
  const [topics, setTopics] = useState<Topic[]>([]);
  const [types, setCategories] = useState<Category[]>([]);
  const { openModal, closeModal } = useModal();
  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/courses/`)
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
      });
    fetch(`${import.meta.env.VITE_API_URL}/api/topics/`)
      .then((response) => response.json())
      .then((data) => {
        setTopics(data);
      });
    fetch(`${import.meta.env.VITE_API_URL}/api/categories/`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      });
  }, []);

  const editCourse = (Course: Course) => {
    navigate(`/courses/edit/${Course.id}`, {
      state: { from: location.pathname },
    });
  };

  const addCourse = () => {};

  const deleteCourse = async (CourseId: number) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/courses/erase/${CourseId}`,
        { method: "DELETE" },
      );
      setCourses((prev) => prev.filter((p) => p.id !== CourseId));
      alert("Cours supprimé avec succès !");
    } catch (error) {
      alert("Erreur lors de la suppression du cours.");
    }
  };

  const updateData = () => {};

  const showCourse = (Course: Course) => {
    console.info(Course.id);
    navigate(`/courses/${Course.id}`, { state: { from: location.pathname } });
  };
  const showCourseModal = (Course: Course) => {
    openModal("edit", <CourseDetailCard data={Course} />);
  };

  const confirmDeleteCourse = (CourseId: number) => {
    const course = courses.find((course) => course.id === Number(CourseId));
    if (!course) return;
    openModal(
      "confirm",
      <SimpleDamagedPaper>
        <h2>confirm destruction ?</h2>
        <CourseCard data={course} />
        <button
          type="button"
          onClick={() => {
            deleteCourse(CourseId);
            closeModal();
          }}
        >
          Oui
        </button>
        <button
          type="button"
          onClick={() => {
            closeModal();
          }}
        >
          Non
        </button>
      </SimpleDamagedPaper>,
    );
  };
  return (
    <CoursesContext.Provider
      value={{
        courses,
        topics,
        types,
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
