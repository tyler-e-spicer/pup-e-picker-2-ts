import {
  useContext,
  ReactNode,
  createContext,
  useState,
  useEffect,
} from "react";

import { Dog } from "../types";

import { Requests } from "../api";

import toast from "react-hot-toast";

type DogContextProviderProps = {
  children?: ReactNode;
};

type DogContext = {
  dogsList: Dog[];
  isLoading: boolean;
  handleUpdateDog: (dogId: number, updatedDog: Partial<Dog>) => Promise<void>;
  handleDeleteDog: (dogId: number) => Promise<void>;
  handleAddDog: (dog: Omit<Dog, "id">) => Promise<void>;
};

const { getAllDogs, patchFavoriteForDog, postDog, deleteDogRequest } = Requests;

const DogsContext = createContext({} as DogContext);

export const DogsContextProvider = ({ children }: DogContextProviderProps) => {
  const [dogsList, setDogsList] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDogs = () => {
    return getAllDogs()
      .then(setDogsList)
      .catch((err) => {
        console.error("Error fecthing dogs... ", err);
      });
  };

  useEffect(() => {
    void fetchDogs();
  }, []);

  const handleDeleteDog = (dogId: number) => {
    setIsLoading(true);
    return deleteDogRequest(dogId)
      .then(fetchDogs)
      .then(() => {
        toast.success("The dog was deleted successfully");
      })
      .catch((error) => {
        console.error(`Error deleting dog with ID ${dogId}:`, error);
      })
      .finally(() => {
        setDogsList(dogsList);
        setIsLoading(false);
      });
  };

  const handleUpdateDog = (dogId: number, updatedDog: Partial<Dog>) => {
    setIsLoading(true);
    return patchFavoriteForDog(dogId, updatedDog)
      .then(fetchDogs)
      .then(() => {
        toast.success("The dog was updated successfully");
      })
      .catch((error) => {
        toast.error(`Error updating dog with ID ${dogId}:`);
        console.error("Error creating dog:", error);
      })
      .finally(() => {
        setDogsList(dogsList);
        setIsLoading(false);
      });
  };

  const handleAddDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    return postDog(dog)
      .then(fetchDogs)
      .then(() => {
        toast.success("The dog was added successfully");
      })
      .catch((error) => {
        toast.error("Failed to add the dog");
        console.error("Error adding dog:", error);
      })
      .finally(() => {
        setDogsList(dogsList);
        setIsLoading(false);
      });
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

export const useDogsProvider = () => useContext(DogsContext);
