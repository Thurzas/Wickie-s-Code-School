import Markdown from "react-markdown";
import { useParams } from "react-router";
import { useCourses } from "../../components/Contexts/CourseContext";
import "./CourseDetail.css";
const CourseDetail = () => {
  const { id } = useParams();
  if (!id) return;
  const { courses } = useCourses();
  const course = courses.find((course) => course.id === Number(id));
  console.info(id, courses, course);
  if (!course) return;
  return (
    <>
      <section className="CourseDetailLayout">
        <h1>{course.title}</h1>
        <section>
          <Markdown>{course.corpus}</Markdown>
        </section>
      </section>
      <section />
    </>
  );
};
export default CourseDetail;
