import { type FormEvent, useEffect, useState } from "react";
import { type Course, useCourses } from "../Contexts/CourseContext";
import "./EditCourseCard.css";
import { X } from "lucide-react";
import { useModal } from "../Contexts/ModalContext";
import Modal from "../Modal/Modal";

const EditCourseCard = ({ data }: { data: Course }) => {
  const [title, setTitle] = useState<string>(data.title ?? "");
  const [corpus, setCorpus] = useState<string>(data.corpus ?? "");
  const { targetModal, setIsScrollable } = useModal();
  const { showCourseModal } = useCourses();

  useEffect(() => {
    setCorpus(data.corpus ?? "");
    setTitle(data.title ?? "");
  }, [data]);

  function handleCorpusChange(value: string) {
    setCorpus(value);
  }
  function handleTitleChange(value: string) {
    setTitle(value);
  }
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche le rechargement de la page

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/courses/edit/${data.id}`,
        {
          method: "POST", // On met à jour un cours existant
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: data.id,
            corpus: corpus,
            title: title,
            image: data.image,
            is_active: true,
            type: data.type,
            topic: data.topic,
            id_category: data.id_category,
            topic_id: data.topic_id,
            reward: data.reward,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.info("Mise à jour réussie :", result);
      alert("Le cours a bien été mis à jour !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      alert("Une erreur est survenue lors de la mise à jour.");
    }
  };

  return (
    <>
      <Modal>
        <div className="preview">{targetModal}</div>
      </Modal>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">title:</label>
        <input
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
        <label htmlFor="corpus">Prompt:</label>
        <textarea
          className="editCorpusArea"
          value={corpus}
          onChange={(e) => handleCorpusChange(e.target.value)}
        />
        <button type="submit">Envoyer</button>
      </form>
      <button
        type="button"
        onClick={() => {
          showCourseModal({
            id: data.id,
            title: data.title,
            image: data.image,
            corpus: corpus,
            is_active: true,
            type: data.type,
            topic: data.topic,
            id_category: data.id_category,
            topic_id: data.topic_id,
            reward: data.reward,
          });
          setIsScrollable(true);
        }}
      >
        Preview
      </button>
      <button type="button" onClick={() => {}}>
        <X />
      </button>
    </>
  );
};

export default EditCourseCard;
