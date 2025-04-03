import Carousel from "../../components/Carrousel/Carousel";
import { usePersons } from "../../components/Contexts/PersonContext"; // Import du hook
import PersonCard from "../../components/Person/PersonCard";
import Wanted from "../../components/Wanted/Wanted";
import style from "./Crew.module.css";
const Corrections = () => {
  const { persons } = usePersons(); // Récupération des personnes depuis le contextec
  const itemsForCarousel = persons.map((person) => (
    <article key={person.id} className={style.article}>
      <Wanted>
        <PersonCard key={person.id} data={person} />
        <p> sur la quête: </p>
      </Wanted>
    </article>
  ));
  return (
    <>
      <Carousel items={itemsForCarousel} />
    </>
  );
};

export default Corrections;
