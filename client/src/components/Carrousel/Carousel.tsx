import { ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { type MouseEvent, type SetStateAction, useMemo, useState } from "react";
import Style from "./Carousel.module.css";

interface CarouselProps {
  items: React.ReactNode[]; // On accepte une liste d'éléments JSX
}

const Carousel = ({ items }: CarouselProps) => {
  const [index, setIndex] = useState(0);

  const itemsWithId = useMemo(
    () =>
      items.map((item, i) => ({
        item,
        id: i,
      })) || [],
    [items],
  );
  const handleNext = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleBefore = () => {
    if (index + 1 < items.length) {
      setIndex(index + 1);
    }
  };
  const handleSelect = (
    e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
    data: SetStateAction<number>,
  ) => {
    if (e.target) setIndex(data);
  };
  return (
    <div className={Style.carousel}>
      <div className={Style.index}>
        <ChevronLeft
          width={"30%"}
          height={"30%"}
          color="white"
          className={Style.Left}
          onClick={handleNext}
        />
        {itemsWithId.length ? (
          itemsWithId.map((item) => (
            <div key={item.id} className={Style.index}>
              <Circle
                color="white"
                className={
                  item.id === index ? Style.currentIndex : Style.indexItem
                }
                onClick={(e) => handleSelect(e, item.id)}
              />
            </div>
          ))
        ) : (
          <Circle />
        )}
        <ChevronRight
          width={"30%"}
          height={"30%"}
          color="white"
          className={Style.Right}
          onClick={handleBefore}
        />
      </div>
      {itemsWithId.length ? (
        itemsWithId.map((item) => (
          <div
            key={item.id}
            className={item.id === index ? Style.showItem : Style.item}
          >
            {item.item}
          </div>
        ))
      ) : (
        <p>Aucun élément à afficher</p>
      )}
    </div>
  );
};

export default Carousel;
