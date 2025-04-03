import { useModal } from "../Contexts/ModalContext";
import { type Person, usePersons } from "../Contexts/PersonContext";
import style from "./ConfirmDeletePerson.module.css";
import PersonCard from "./PersonCard";
interface ConfirmDeletePersonProps {
  Person: Person;
}

const ConfirmDeletePerson = ({ Person }: ConfirmDeletePersonProps) => {
  const { deletePerson } = usePersons();
  const { closeModal } = useModal();
  return (
    <>
      <div className={style.PersonLayout}>
        <h3 className={style.paragraphe}>
          veux tu vraiment supprimer ce produit ?
        </h3>
        <div className={style.cookieLayout}>
          <PersonCard data={Person} />
        </div>
        <div className={style.buttons}>
          <button
            className={style.confirmation}
            type="button"
            onClick={() => {
              deletePerson(Person.id ? Person.id : -1);
              closeModal();
            }}
          >
            Confirmer
          </button>
          <button className={style.cancel} type="button" onClick={closeModal}>
            Annuler
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmDeletePerson;
