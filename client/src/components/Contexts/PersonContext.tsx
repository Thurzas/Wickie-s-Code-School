import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import ConfirmDeletePerson from "../Person/ConfirmDeletePerson";
import EditPersonCard from "../Person/EditPersonCard";
import PersonCard from "../Person/PersonCard";
import Wanted from "../Wanted/Wanted";
import { useModal } from "./ModalContext";

export type Person = {
  id?: number;
  firstname: string;
  lastname: string;
  pseudo: string;
  image: string;
  age: number;
  privillege: "aspirant" | "viking" | "jaarl" | "thor" | "odin";
  level: number;
  xp: number;
};

interface PersonContextType {
  persons: Person[];
  editPerson: (Person: Person) => void;
  addPerson: () => void;
  deletePerson: (PersonId: number) => void;
  updateData: () => void;
  showPerson: (Person: Person) => void;
  confirmDeletePerson: (PersonId: number) => void;
}

const PersonsContext = createContext<PersonContextType | undefined>(undefined);

export const usePersons = () => {
  const context = useContext(PersonsContext);
  if (!context) {
    throw new Error("usePersons doit être utilisé dans un PersonsProvider");
  }
  return context;
};

export const PersonsProvider = ({ children }: { children: ReactNode }) => {
  const [persons, setPerson] = useState<Person[]>([]);
  const { openModal } = useModal();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => {
        setPerson(data);
      });
  }, []);

  const editPerson = (Person: Person) => {
    openModal(
      "edit",
      <Wanted>
        <EditPersonCard data={Person} />
      </Wanted>,
    );
  };
  const addPerson = () => {
    openModal(
      "add",
      <Wanted>
        <EditPersonCard
          data={{
            firstname: "Bjorn",
            lastname: "Raven",
            pseudo: "Oeil de verre",
            image: "portrait8.png",
            age: 30,
            privillege: "aspirant",
            level: 1,
            xp: 1,
          }}
        />
      </Wanted>,
    );
  };

  const confirmDeletePerson = (PersonId: number) => {
    const person = persons.filter(
      (person) => person.id === PersonId,
    )[0] as Person;
    if (person) {
      openModal("confirm", <ConfirmDeletePerson Person={person} />);
    }
  };
  const deletePerson = async (PersonId: number) => {
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/Person/delette/${PersonId}`,
        { method: "DELETE" },
      );
      setPerson((prev) => prev.filter((p) => p.id !== PersonId));
      alert("Produit supprimé avec succès !");
    } catch (error) {
      alert("Erreur lors de la suppression du produit.");
    }
    updateData();
  };

  const updateData = () => {};

  const showPerson = (Person: Person) => {
    openModal(
      "edit",
      <Wanted>
        <PersonCard data={Person} />
      </Wanted>,
    );
  };

  return (
    <PersonsContext.Provider
      value={{
        persons,
        editPerson,
        addPerson,
        deletePerson,
        updateData,
        showPerson,
        confirmDeletePerson,
      }}
    >
      {children}
    </PersonsContext.Provider>
  );
};
