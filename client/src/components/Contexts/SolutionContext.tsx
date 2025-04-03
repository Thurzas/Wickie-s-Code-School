import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import EditSolutionCard from "../Solution/EditSolutionCard";
import SolutionCard from "../Solution/SolutionCard";
import Wanted from "../Wanted/Wanted";
import { useModal } from "./ModalContext";

export type Solution = {
  id: number;
  id_user: number;
  id_course: number;
  corpus_solution: string;
  isValidated: boolean;
};

interface SolutionContextType {
  Solutions: Solution[];
  editSolution: (Solution: Solution) => void;
  addSolution: () => void;
  deleteSolution: (SolutionId: number) => void;
  updateData: () => void;
  showSolution: (Solution: Solution) => void;
  confirmDeleteSolution: (SolutionId: number) => void;
}

const SolutionsContext = createContext<SolutionContextType | undefined>(
  undefined,
);

export const useSolutions = () => {
  const context = useContext(SolutionsContext);
  if (!context) {
    throw new Error("useSolutions doit être utilisé dans un SolutionsProvider");
  }
  return context;
};

export const SolutionsProvider = ({ children }: { children: ReactNode }) => {
  const [Solutions, setSolutions] = useState<Solution[]>([]);
  const { openModal } = useModal();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => {
        setSolutions(data);
      });
  }, []);

  const editSolution = (Solution: Solution) => {
    openModal(
      "edit",
      <Wanted>
        <EditSolutionCard data={Solution} />
      </Wanted>,
    );
  };

  const addSolution = () => {};

  const deleteSolution = (SolutionId: number) => {
    console.info(SolutionId);
  };

  const updateData = () => {};

  const showSolution = (Solution: Solution) => {
    openModal(
      "edit",
      <Wanted>
        <SolutionCard data={Solution} />
      </Wanted>,
    );
  };

  const confirmDeleteSolution = (SolutionId: number) => {
    console.info(SolutionId);
  };

  return (
    <SolutionsContext.Provider
      value={{
        Solutions,
        editSolution,
        addSolution,
        deleteSolution,
        updateData,
        showSolution,
        confirmDeleteSolution,
      }}
    >
      {children}
    </SolutionsContext.Provider>
  );
};
