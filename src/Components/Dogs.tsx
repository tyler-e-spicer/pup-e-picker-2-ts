import { useDogsProvider } from "../Providers/dogProvider";
import { useSectionProvider } from "../Providers/sectionProvider";
import { DogCard } from "./DogCard";

export const Dogs = () => {
  const { dogsList, isLoading, handleDeleteDog, handleUpdateDog } =
    useDogsProvider();
  const { activeSection } = useSectionProvider();

  const dogsToRender = (() => {
    switch (activeSection) {
      case "favorited":
        return dogsList.filter((dog) => dog.isFavorite);
      case "unfavorited":
        return dogsList.filter((dog) => !dog.isFavorite);
      default:
        return dogsList;
    }
  })();

  return (
    <>
      {dogsToRender.map((dog) => {
        return (
          <DogCard
            key={dog.name}
            dog={dog}
            isLoading={isLoading}
            onHeartClick={handleUpdateDog}
            onEmptyHeartClick={handleUpdateDog}
            onTrashIconClick={handleDeleteDog}
          />
        );
      })}
    </>
  );
};
