import { Dog } from "./types";
const baseURL = "http://localhost:3000/dogs";

const checkResponse = (message: string) => (res: Response) => {
  if (!res.ok) {
    throw new Error(message);
  }
  return res.json();
};

const getAllDogs = () => {
  return fetch(`${baseURL}`).then(checkResponse("Could not fetch all dogs."));
};

const postDog = (newDog: Omit<Dog, "id">) => {
  return fetch(`${baseURL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDog),
  }).then(checkResponse("Could not create dog."));
};
const deleteDogRequest = (dogId: number) => {
  return fetch(`${baseURL}/${dogId}`, {
    method: "DELETE",
  }).then(checkResponse("Could not delete dog."));
};

const patchFavoriteForDog = (dogId: number, updatedDog: Partial<Dog>) => {
  return fetch(`${baseURL}/${dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedDog),
  }).then(checkResponse("Failed to update dog"));
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
