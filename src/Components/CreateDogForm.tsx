import { FormEvent, useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogsProvider } from "../Providers/dogProvider";

export const CreateDogForm = () => {
  const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { handleAddDog, isLoading } = useDogsProvider();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleAddDog({
      name,
      description,
      image: selectedImage,
      isFavorite: false,
    });
    formReset();
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
        type="text"
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor="description">Dog Description</label>
      <textarea
        name=""
        id=""
        cols={80}
        rows={10}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isLoading}
      ></textarea>
      <label htmlFor="picture">Select an Image</label>
      <select
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
