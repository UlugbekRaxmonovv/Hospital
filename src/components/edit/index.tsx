import React, { ChangeEvent, useState } from "react";
import axios from "axios";

interface DataType {
  id: string;
  firstname: string;
  lastname:string;
  date_of_birth:string;
  email: string;
  username: string;
  password: string;
  user_location:string;
}


interface EditProps {
  isModalOpen: DataType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<DataType | null>>;
  setRelout: React.Dispatch<React.SetStateAction<boolean>>;
}

const Edit: React.FC<EditProps> = ({ isModalOpen, setIsModalOpen, setRelout }) => {
    const [loading,setLoading] = useState<boolean>(false);
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
    setLoading(true);
    axios
      .put(`https://667fec3456c2c76b495a8d83.mockapi.io/cards/${isModalOpen.id}`, isModalOpen)
      .then((response) => {
        console.log("Updated data:", response.data);
        setRelout((p) => !p);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="">
          <form onSubmit={handleFormSubmit}>
            <input
              name="category"
              value={isModalOpen.firstname}
              onChange={handleInputChange}
              type="text"
              className="border w-full h-[40px] rounded px-[10px] mb-4 outline-none"
            /> <br />
            <input
              name="desc"
              value={isModalOpen.lastname}
              onChange={handleInputChange}
              type="text"
              className="border w-full h-[40px] rounded px-[10px] mb-4 outline-none"
            /> <br />
            <input
              name="price"
              value={isModalOpen.date_of_birth}
              onChange={handleInputChange}
              type="number"  
              className="border w-full h-[40px] rounded px-[10px] mb-4 outline-none"
            /> <br />
           <div className="flex gap-2 w-full">
           <button type="submit" className="bg-blue-500 text-white w-[50%] h-[40px] rounded " onClick={() => setIsModalOpen(null)}>
            Cancel
            </button>
           <button type="submit" className="bg-blue-500 text-white w-[50%] h-[40px] rounded" disabled={loading}>
           {loading ? "Loading..." : "Save"}
            </button>
           
           </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
