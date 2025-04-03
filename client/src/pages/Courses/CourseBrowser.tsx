import { useCourses } from "../../components/Contexts/CourseContext";
import CourseCard from "../../components/Course/CourseCard";
import style from "./CourseBrowser.module.css";
const CourseBrowser = () => {
  const { courses, showCourse } = useCourses();

  return (
    <>
      <h2>Courses </h2>
      <section className={style.layoutcourse}>
        {courses.map((course) => (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <article
            className={style.course}
            key={course.id}
            onClick={() => {
              showCourse(course);
            }}
          >
            <CourseCard data={course} />
          </article>
        ))}
      </section>
    </>
  );
};
export default CourseBrowser;
