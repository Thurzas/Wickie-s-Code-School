import Markdown from "react-markdown";
import "./CourseDetailCard.css";
import type { Course } from "../Contexts/CourseContext";
const CourseDetail = ({ data }: { data: Course }) => {
  return (
    <>
      <section className="CourseDetailLayout">
        <h1>{data.title}</h1>
        <section>
          <Markdown>{data.corpus}</Markdown>
        </section>
      </section>
    </>
  );
};
export default CourseDetail;
