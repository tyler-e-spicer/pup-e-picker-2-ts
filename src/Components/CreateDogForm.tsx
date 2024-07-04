import { FormEvent, useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogs } from "../Hooks/providerHooks";
import toast from "react-hot-toast";

export const CreateDogForm = () => {
  const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { handleAddDog, isLoading } = useDogs();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleAddDog({
      name,
      description,
      image: selectedImage,
      isFavorite: false,
    })
      .then(() => {
        console.log("Resetting the form...");
        formReset();
      })
      .catch(() => {
        toast.error("Error adding dog");
      });
  };

  const formReset = () => {
    setName("");
    setDescription("");
    setSelectedImage(dogPictures.BlueHeeler);
  };

  return (
    <form action="" id="create-dog-form" onSubmit={handleSubmit}>
      <h4>Create a New Dog</h4>
      <label htmlFor="name">Dog Name</label>
      <input
        value={name}
        type="text"
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        value={description}
        name=""
        id=""
        cols={80}
        rows={10}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
        value={selectedImage}
        id=""
        onChange={(e) => {
          setSelectedImage(e.target.value);
        }}
        disabled={isLoading}
      >
        {Object.entries(dogPictures).map(([label, pictureValue]) => {
          return (
            <option value={pictureValue} key={pictureValue}>
              {label}
            </option>
          );
        })}
      </select>
      <input type="submit" value="submit" />
    </form>
  );
};
