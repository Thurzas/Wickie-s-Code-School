import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useParams } from "react-router";
import {
  type Course,
  useCourses,
} from "../../components/Contexts/CourseContext";
import "./CourseDetail.css";

const CourseDetail = () => {
  const { id } = useParams();
  const { courses } = useCourses();

  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  useEffect(() => {
    if (!id || !courses.length) return; // Attendre que les données soient là
    const foundCourse = courses.find((course) => course.id === Number(id));
    setCurrentCourse(foundCourse ?? null);
  }, [id, courses]); // Se déclenche dès que courses change

  if (!currentCourse) {
    return <p>Chargement du cours...</p>; // Affiche "Chargement" si pas encore trouvé
  }

  return (
    <section className="CourseDetailLayout">
      <h1>{currentCourse.title}</h1>
      <section>
        <Markdown>{currentCourse.corpus}</Markdown>
      </section>
    </section>
  );
};

export default CourseDetail;
