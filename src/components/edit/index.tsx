import React, { ChangeEvent } from "react";
import axios from "axios";

interface DataType {
  id: string;
  title: string;
  price: number;  // O'zgartirildi: `string`dan `number`ga
  url: string[];
  category: string;
  desc: string;
}

interface EditProps {
  isModalOpen: DataType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<DataType | null>>;
  setRelout: React.Dispatch<React.SetStateAction<boolean>>;
}

const Edit: React.FC<EditProps> = ({ isModalOpen, setIsModalOpen, setRelout }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIsModalOpen((prev) =>
      prev
        ? {
            ...prev,
            [name]: name === "price" ? parseFloat(value) || 0 : value,  // `price` qiymatini `number`ga o'zgartiradi
          }
        : null
    );
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .put(`https://667fec3456c2c76b495a8d83.mockapi.io/cards/${isModalOpen.id}`, isModalOpen)
      .then((response) => {
        console.log("Updated data:", response.data);
        setRelout((p) => !p);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="">
          <form onSubmit={handleFormSubmit}>
            <input
              name="category"
              value={isModalOpen.category}
              onChange={handleInputChange}
              type="text"
              className="border w-full h-[40px] rounded px-[10px] mb-4 outline-none"
            /> <br />
            <input
              name="desc"
              value={isModalOpen.desc}
              onChange={handleInputChange}
              type="text"
              className="border w-full h-[40px] rounded px-[10px] mb-4 outline-none"
            /> <br />
            <input
              name="price"
              value={isModalOpen.price}
              onChange={handleInputChange}
              type="number"  // `number` turidagi input
              className="border w-full h-[40px] rounded px-[10px] mb-4 outline-none"
            /> <br />
            <button type="submit" className="bg-blue-500 text-white w-full h-[40px] rounded ">
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
