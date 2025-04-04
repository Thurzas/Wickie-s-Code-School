import { type FormEvent, useEffect, useState } from "react";
import {
  type Category,
  type Course,
  type Topic,
  useCourses,
} from "../Contexts/CourseContext";
import "./EditCourseCard.css";
import { useModal } from "../Contexts/ModalContext";
import Modal from "../Modal/Modal";

const AddCourseCard = () => {
  // Objet par défaut pour le cours (valeurs arbitraires par défaut)
  const defaultCourse: Course = {
    id: 0,
    title: "",
    image: "",
    corpus: "",
    is_active: true,
    type: "",
    id_category: 1, // Valeur par défaut (peut être modifiée)
    topic: "",
    reward: 0,
    topic_id: 1, // Valeur par défaut (peut être modifiée)
  };

  // État local pour gérer les valeurs du formulaire
  const [title, setTitle] = useState<string>(defaultCourse.title);
  const [corpus, setCorpus] = useState<string>(defaultCourse.corpus);
  const [selectedCategory, setSelectedCategory] = useState<number>(
    defaultCourse.id_category,
  );
  const [selectedTopic, setSelectedTopic] = useState<number>(
    defaultCourse.topic_id,
  );

  const { targetModal, setIsScrollable } = useModal();
  const { showCourseModal, types, topics, courses } = useCourses(); // Récupère les catégories et topics depuis le contexte

  useEffect(() => {
    setCorpus(defaultCourse.corpus);
    setSelectedCategory(defaultCourse.id_category);
    setSelectedTopic(defaultCourse.topic_id);
  }, []); // Effect qui se lance au montage

  function handleCorpusChange(value: string) {
    setCorpus(value);
  }
  function handleTitleChange(value: string) {
    setTitle(value);
  }

  function handleCategoryChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(Number(event.target.value));
  }

  function handleTopicChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedTopic(Number(event.target.value));
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche le rechargement de la page

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/courses/add/`,
        {
          method: "POST", // On met à jour un cours existant
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: courses.length + 1,
            corpus: corpus,
            title: title,
            image: defaultCourse.image,
            is_active: true,
            type: defaultCourse.type,
            topic: defaultCourse.topic, // L'ID du topic peut être utilisé ici ou le nom si nécessaire
            id_category: selectedCategory, // Utilise la catégorie sélectionnée
            topic_id: selectedTopic, // Utilise le topic sélectionné
            reward: defaultCourse.reward,
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

        {/* Sélecteur pour les catégories */}
        <label htmlFor="category">Catégorie:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {types.map((category: Category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Sélecteur pour les topics */}
        <label htmlFor="topic">Topic:</label>
        <select id="topic" value={selectedTopic} onChange={handleTopicChange}>
          {topics.map((topic: Topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>

        <button type="submit">Envoyer</button>
      </form>

      <button
        type="button"
        onClick={() => {
          showCourseModal({
            id: defaultCourse.id,
            title: title,
            image: defaultCourse.image,
            corpus: corpus,
            is_active: true,
            type: defaultCourse.type,
            topic: defaultCourse.topic,
            id_category: selectedCategory,
            topic_id: selectedTopic,
            reward: defaultCourse.reward,
          });
          setIsScrollable(true);
        }}
      >
        Preview
      </button>
    </>
  );
};

export default AddCourseCard;
