import type { Person } from "../Contexts/PersonContext";
import style from "./PersonCard.module.css";

const PersonCard = ({ data }: { data: Person }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return (
    <>
      <div className={style.layout}>
        <img
          className={style.avatar}
          src={`${apiUrl}${data.image}`}
          crossOrigin="anonymous"
          alt="le gros viking !"
        />

        <h2 className={style.h2}>{`${data.firstname} "${data.pseudo}" ${data.lastname}`}</h2>
        <p className={style.age}> age: {data.age} ans</p>
      </div>
    </>
  );
};
export default PersonCard;
