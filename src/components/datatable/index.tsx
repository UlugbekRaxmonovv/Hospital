import React, { ChangeEvent, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axios from "axios";
import { Modal, Button, Input } from "antd";
import type { GetProps } from 'antd';
import Edit from '../../components/edit';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

interface DataType {
  id: string;
  title: string;
  price: number;
  url: string[];
  category: string;
  desc: string;
}

interface DenseTableProps {
  relout: boolean;
  setRelout: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormState {
  title: string;
  price: string;
  url: string;
  category: string;
  desc: string;
}

const initialState: FormState = {
  title: "",
  price: "",
  url: "",
  category: "",
  desc: "",
};

const DenseTable: React.FC<DenseTableProps> = ({ relout, setRelout }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [img, setImg] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<DataType | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [state, setState] = useState<FormState>(initialState);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      title: state.title,
      price: +state.price,
      url: state.url.split("\n").filter((i) => i.trim()),
      category: state.category,
      desc: state.desc,
    };

    try {
      await axios.post("https://667fec3456c2c76b495a8d83.mockapi.io/cards", product);
      setRelout((prev) => !prev);
      setIsModalOpenCreate(false);
      setState(initialState); 
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const handleEditSubmit = (row: DataType) => {
    setIsModalOpen(row);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://667fec3456c2c76b495a8d83.mockapi.io/cards/${itemToDelete}`);
      setData(data.filter(item => item.id !== itemToDelete));
      setRelout(prev => !prev);
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      setDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(import.meta.env.VITE_BASE_URL + "/cards")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [relout]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setImg(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [relout]);

  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);

  const showModal = () => {
    setIsModalOpenCreate(true);
  };

  const handleCancel = () => {
    setIsModalOpenCreate(false);
  };

  const [value, setValue] =useState<string>("")
  console.log(value);
  

  return (
    <div className="w-full">
      <Box sx={{ padding: '5px 0', display: 'flex', gap: '20px' }}>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          value={value}
          onChange={(e) =>setValue(e.target.value)}
          style={{ width: '90%' }}
        />
        <Button type="primary" onClick={showModal} style={{ padding: '19px' }}>
          Create products
        </Button>
      </Box>
      <Box sx={{ padding: '20px 0' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Images</TableCell>
                <TableCell align="left">Active</TableCell>
              </TableRow>
            </TableHead>
            {loading && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  width: "100%",
                  height: "100vh",
                  top: "0",
                  left: "0",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  zIndex: 9999,
                }}
              >
                <CircularProgress color="inherit" />
              </Box>
            )}
            <TableBody>
              {data?.filter((user) =>
                    user.title.toLowerCase().includes(value.toLowerCase()) 
                  )
                  ?.map((row, inx) => (
                <TableRow
                  key={inx}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {inx + 1}
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell align="center">{row.price}</TableCell>
                  <TableCell align="center">{row.category}</TableCell>
                  <TableCell align="left">{row.desc}</TableCell>
                  <TableCell align="left">
                    <Box
                      sx={{ width: "50px", height: "40px", overflow: "hidden" }}
                    >
                      <div className="w-full h-full">
                        <img
                          src={row.url[0]}
                          className={`${
                            !img ? "blur_none" : "blur"
                          } w-[50px] h-[50px] object-contain cursor-pointer`}
                          alt={row.title}
                        />
                      </div>
                    </Box>
                  </TableCell>
                  <TableCell align="left">
                    <div className="flex space-x-2">
                      <button
                        className="bg-slate-700 text-white px-2 py-1 rounded"
                        onClick={() => handleEditSubmit(row)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-2 py-1 rounded"
                        onClick={() => {
                          setItemToDelete(row.id);
                          setDeleteModalOpen(true);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Modal
        title="Delete Confirmation"
        open={deleteModalOpen}
        onOk={handleDelete}
        onCancel={() => setDeleteModalOpen(false)}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>

      {isModalOpen && (
        <Modal
          title="Edit Card"
          centered
          open={true}
          onOk={() => setIsModalOpen(null)}
          onCancel={() => setIsModalOpen(null)}
          footer={false}
          width={300}
        >
          <Edit
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            setRelout={setRelout}
          />
        </Modal>
      )}

      <Modal
        title="Create Product"
        open={isModalOpenCreate}
        onCancel={handleCancel}
        footer={false}
        width={400}
      >
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Title"
            name="title"
            className="mb-5"
            onChange={handleChange}
            value={state.title}
          />
          <Input
            placeholder="Price"
            type="number"
            name="price"
            className="mb-5"
            onChange={handleChange}
            value={state.price}
          />
          <Input
            placeholder="Description "
            name="desc"
            className="mb-5"
            onChange={handleChange}
            value={state.desc}
          />
          <Input
            placeholder="Category"
            name="category"
            className="mb-5"
            onChange={handleChange}
            value={state.category}
          />
          <Input.TextArea
            placeholder="Image URLs (new line separated)"
            name="url"
            className="mb-5"
            onChange={handleChange}
            value={state.url}
          />
          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default DenseTable;
