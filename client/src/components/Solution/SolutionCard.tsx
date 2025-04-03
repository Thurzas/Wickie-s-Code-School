import Markdown from "react-markdown";
import type { Solution } from "../Contexts/SolutionContext";

const SolutionCard = ({ data }: { data: Solution }) => {
  return (
    <>
      {/* ici on affiche la solution de l'éleve */}
      <section>
        <Markdown>{data.corpus_solution}</Markdown>
      </section>

      <section>
        <button type="button"> voir la quête</button>{" "}
        {/* ouvre la fenetre modale pour voir la quete concerné */}
        <button type="button"> Commenter la solution</button>{" "}
        {/* ouvre la fenetre modale de commentSolution, */}
      </section>
    </>
  );
};
export default SolutionCard;
