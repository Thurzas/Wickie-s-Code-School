import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import EditCommentSolutionCard from "../CommentSolution/EditCommentSolutionCard";
import Wanted from "../Wanted/Wanted";
import { useModal } from "./ModalContext";

export type CommentSolution = {
  id: number;
  id_user: number;
  id_user_target: number;
  id_solution: number;
  text_comment_solution: string;
  isValidated: boolean;
};

interface CommentSolutionContextType {
  CommentSolutions: CommentSolution[];
  editCommentSolution: (CommentSolution: CommentSolution) => void;
  addCommentSolution: () => void;
  deleteCommentSolution: (CommentSolutionId: number) => void;
  updateData: () => void;
  showCommentSolution: (CommentSolution: CommentSolution) => void;
  confirmDeleteCommentSolution: (CommentSolutionId: number) => void;
}

const CommentSolutionsContext = createContext<
  CommentSolutionContextType | undefined
>(undefined);

export const useCommentSolutions = () => {
  const context = useContext(CommentSolutionsContext);
  if (!context) {
    throw new Error(
      "useCommentSolutions doit être utilisé dans un CommentSolutionsProvider",
    );
  }
  return context;
};

export const CommentSolutionsProvider = ({
  children,
}: { children: ReactNode }) => {
  const [CommentSolutions, setCommentSolutions] = useState<CommentSolution[]>(
    [],
  );
  const { openModal } = useModal();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users`)
      .then((response) => response.json())
      .then((data) => {
        setCommentSolutions(data);
      });
  }, []);

  const editCommentSolution = (CommentSolution: CommentSolution) => {
    console.info(CommentSolution);
    openModal(
      "edit",
      <Wanted>
        <EditCommentSolutionCard />
      </Wanted>,
    );
  };
  const addCommentSolution = () => {};

  const deleteCommentSolution = (CommentSolutionId: number) => {
    console.info(CommentSolutionId);
  };

  const updateData = () => {};

  const showCommentSolution = (CommentSolution: CommentSolution) => {
    console.info(CommentSolution);
  };

  const confirmDeleteCommentSolution = (CommentSolutionId: number) => {
    console.info(CommentSolutionId);
  };

  return (
    <CommentSolutionsContext.Provider
      value={{
        CommentSolutions,
        editCommentSolution,
        addCommentSolution,
        deleteCommentSolution,
        updateData,
        showCommentSolution,
        confirmDeleteCommentSolution,
      }}
    >
      {children}
    </CommentSolutionsContext.Provider>
  );
};
