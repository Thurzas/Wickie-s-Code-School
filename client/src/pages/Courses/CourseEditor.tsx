import { useParams } from "react-router";
import { useCourses } from "../../components/Contexts/CourseContext";
import AddCourseCard from "../../components/Course/AddCourseCard";
import EditCourseCard from "../../components/Course/EditCourseCard";

const CourseEditor = () => {
  const { id } = useParams();
  if (!id) {
    /* pas d'identifiant, alors on va faire comme si c'était le mode New*/
    /*on va fournir une liste de topics et une liste de catégories issues de CourseContext*/
    return (
      <>
        <AddCourseCard />
      </>
    );
  }
  const { courses } = useCourses();
  const course = courses.find((course) => course.id === Number(id));
  if (!course) return;
  return (
    <>
      <EditCourseCard data={course} />
    </>
  );
};
export default CourseEditor;
