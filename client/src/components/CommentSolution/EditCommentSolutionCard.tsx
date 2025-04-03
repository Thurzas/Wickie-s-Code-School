import style from "CommentSolutionCard.module.css";
import { type FormEvent, useState } from "react";

const EditCommentSolutionCard = () => {
  const [comment, setCurrentComment] = useState<string>();
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked); // Inverse l'état de la checkbox
  };
  const handleChangeTextarea = (value: string) => {
    setCurrentComment(value);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.info(event);
  };

  return (
    <>
      {/* Ici on met les commentaires */}
      <form onSubmit={handleSubmit}>
        <section className={style.layout}>
          <textarea
            className={`${style.inputStyle} ${style.textarea}`}
            name="comment"
            defaultValue={comment}
            onChange={(e) => {
              handleChangeTextarea(e.target.value);
            }}
            maxLength={55}
          />
          <label className={style.switch}>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleToggle}
            />
            <span className={style.slider} />
          </label>
        </section>
        <section>
          {/*TODO : la modale pour répondre et approuver si on est pas celui qui à écrit la*/}
          <button type="submit"> valider</button>
        </section>
      </form>
    </>
  );
};

export default EditCommentSolutionCard;
