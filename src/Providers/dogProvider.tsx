import { ReactNode, createContext, useState, useEffect } from "react";

import { Dog } from "../types";

import { Requests } from "../api";

import toast from "react-hot-toast";

type DogContextProviderProps = {
  children?: ReactNode;
};

type DogContext = {
  dogsList: Dog[];
  isLoading: boolean;
  handleUpdateDog: (dogId: number, updatedDog: Partial<Dog>) => void;
  handleDeleteDog: (dogId: number) => void;
  handleAddDog: (dog: Omit<Dog, "id">) => Promise<unknown>;
};

const { getAllDogs, patchFavoriteForDog, postDog, deleteDogRequest } = Requests;

export const DogsContext = createContext({} as DogContext);

export const DogsContextProvider = ({ children }: DogContextProviderProps) => {
  const [dogsList, setDogsList] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDogs = () => {
    getAllDogs()
      .then(setDogsList)
      .catch((err) => {
        console.error("Error fecthing dogs... ", err);
      });
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  const handleDeleteDog = (dogId: number): void => {
    setDogsList(dogsList.filter((dog) => dog.id !== dogId));
    deleteDogRequest(dogId)
      .then(fetchDogs)
      .then(() => {
        toast.success("The dog was deleted successfully");
      })
      .catch((error) => {
        setDogsList(dogsList);
        toast.error("Woof. Could not delete this dog.");
        console.error(`Error deleting dog with ID ${dogId}:`, error);
      });
  };

  const handleUpdateDog = (dogId: number, updatedDog: Partial<Dog>): void => {
    const fullDog = dogsList.find((dog) => dog.id === dogId);

    if (!fullDog) {
      console.error(`Dog with ID ${dogId} not found.`);
      return;
    }

    const dogToUpdate = { ...fullDog, ...updatedDog };

    setDogsList(dogsList.map((dog) => (dog.id === dogId ? dogToUpdate : dog)));
    patchFavoriteForDog(dogId, updatedDog)
      .then(() => {
        toast.success("The dog was updated successfully");
      })
      .catch((error) => {
        setDogsList(dogsList);
        toast.error(`Error updating dog with ID ${dogId}:`);
        console.error("Error creating dog:", error);
      });
  };

  const handleAddDog = (dog: Omit<Dog, "id">): Promise<unknown> => {
    setIsLoading(true);
    return postDog(dog)
      .then(fetchDogs)
      .then(() => {
        toast.success("The dog was added successfully");
      })
      .finally(() => {
        setIsLoading(false);
      });
    // .catch((error) => {
    //   toast.error("Failed to add the dog");
    //   console.error("Error adding dog:", error);
    // })
    // .finally(() => {
    //   setIsLoading(false);
    // });
  };

  return (
    <DogsContext.Provider
      value={{
        dogsList,
        isLoading,
        handleDeleteDog,
        handleAddDog,
        handleUpdateDog,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};
