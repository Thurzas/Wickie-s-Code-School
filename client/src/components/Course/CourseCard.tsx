import type { Course } from "../Contexts/CourseContext";
import style from "./CourseCard.module.css";
const CourseCard = ({ data }: { data: Course }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <>
      <article className={style.CourseLayout}>
        <section>
          <h1 className={style.type}> {data.type}</h1>
          <h2>{data.title}</h2>
          <img
            className={style.topic}
            src={`${apiUrl}${data.image}`}
            crossOrigin="anonymous"
            alt="IMGtopic"
          />
        </section>
        <section>
          <p>prérequis : (comming soon)</p>
          <p>{data.reward} xp</p>
        </section>
      </article>
    </>
  );
};

export default CourseCard;
