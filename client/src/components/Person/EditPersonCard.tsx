import type { Person } from "../Contexts/PersonContext";
import style from "./PersonCard.module.css";

const EditPersonCard = ({ data }: { data: Person }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <>
      <div className={style.layout}>
        <img
          className={style.avatar}
          src={`${apiUrl}/api/images/${data.image}`}
          crossOrigin="anonymous"
          alt="le gros viking !"
        />

        <h2>{`${data.firstname} "${data.pseudo}" ${data.lastname}`}</h2>
        <p> age: {data.age} ans</p>
      </div>
    </>
  );
};
export default EditPersonCard;
