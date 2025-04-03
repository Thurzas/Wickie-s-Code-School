import { useModal } from "../../components/Contexts/ModalContext";
import { usePersons } from "../../components/Contexts/PersonContext";
import Modal from "../../components/Modal/Modal";
import PersonCard from "../../components/Person/PersonCard";
import style from "./PersonBrowser.module.css";
const PersonsBrowser = () => {
  const { persons, showPerson } = usePersons();
  const { targetModal } = useModal();
  return (
    <>
      <h2>Meet the crew !</h2>
      <section className={style.layoutPerson}>
        {persons.map((person) => (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <article
            className={style.person}
            key={person.id}
            onClick={() => {
              console.info("clicked on ", person);
              showPerson(person);
            }}
          >
            <PersonCard data={person} />
          </article>
        ))}
      </section>
      <Modal>{targetModal}</Modal>
    </>
  );
};

export default PersonsBrowser;
