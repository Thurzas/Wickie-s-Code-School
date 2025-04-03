import style from "CommentSolutionCard.module.css";
import { Check, X } from "lucide-react";
import type { CommentSolution } from "../Contexts/CommentSolutionContext";

const CommentSolutionCard = ({ data }: { data: CommentSolution[] }) => {
  return (
    <>
      {/* Ici on met les commentaires */}
      <section className={style.layout}>
        {data.map((comment) => (
          <article key={comment.id} className={style.comment}>
            <p>{`Utilisateur #${comment.id_user}`}</p>{" "}
            {/* Affichage de l'utilisateur auteur */}
            <p>{comment.text_comment_solution}</p>{" "}
            {/* Affichage du commentaire */}
            <p>
              {comment.isValidated ? (
                <Check color="green" size={20} /> // Icône validée
              ) : (
                <X color="red" size={20} /> // Icône refusée
              )}
            </p>
          </article>
        ))}
      </section>
      <section>
        {/*TODO : la modale pour répondre et approuver si on est pas celui qui à écrit la solution*/}
        <button type="button"> répondre</button>
      </section>
    </>
  );
};

export default CommentSolutionCard;
