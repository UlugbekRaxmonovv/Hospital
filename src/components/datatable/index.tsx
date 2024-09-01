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
import axios from "../../api";
import { Modal, Button, Input } from "antd";
import type { GetProps } from "antd";
import Edit from "../../components/edit";

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
  console.log(info?.source, value);

interface DataType {
  id: string;
  firstname: string;
  email: string;
  username: string;
  password: string;
  user_location: string;
  date_of_birth: string;
  lastname: string;
}

interface DenseTableProps {
  relout: boolean;
  setRelout: React.Dispatch<React.SetStateAction<boolean>>;
}

interface FormState {
  date_of_birth: string;
  email: string;
  firstname: string;
  lastname: string;
  user_location: string;
  username: string;
  password: string;
}

const initialState: FormState = {
  date_of_birth: "",
  email: "",
  firstname: "",
  lastname: "",
  user_location: "",
  username: "",
  password: "",
};

const DenseTable: React.FC<DenseTableProps> = ({ relout, setRelout }) => {
  let isLogin = localStorage.getItem("x-auth-token");
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<DataType | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const [state, setState] = useState<FormState>(initialState);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      firstname: state.firstname,
      lastname: state.lastname,
      date_of_birth: state.date_of_birth,
      email: state.email,
      username: state.username,
      password: state.password,
      user_location: state.user_location,
    };

    try {
      await axios.post("/patients", product, {
        headers: {
          Authorization: `Bearer ${isLogin}`,
        },
      });
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
      await axios.delete(`/patients/${itemToDelete}`, {
        headers: {
          Authorization: `Bearer ${isLogin}`,
        },
      });
      setData((prevData) => prevData.filter((item) => item.id !== itemToDelete));
      setRelout((prev) => !prev);
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
      .get("/patients?sortBy=id&order=asc&page=1&limit=10", {
        headers: {
          Authorization: `Bearer ${isLogin}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [relout]);

  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);

  const showModal = () => {
    setIsModalOpenCreate(true);
  };

  const handleCancel = () => {
    setIsModalOpenCreate(false);
  };

  const [value, setValue] = useState<string>("");
  console.log(value);

  return (
    <div className="w-full">
      <Box sx={{ padding: "5px 0", display: "flex", gap: "20px" }}>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ width: "90%" }}
        />
        <Button type="primary" onClick={showModal} style={{ padding: "19px" }}>
          Create products
        </Button>
      </Box>
      <Box sx={{ padding: "20px 0" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">User Location</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Date of Birth</TableCell>
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
              {data
                ?.filter((user) =>
                  user.lastname.toLowerCase().includes(value.toLowerCase())
                )
                ?.map((row, inx) => (
                  <TableRow
                    key={inx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {inx + 1}
                    </TableCell>
                    <TableCell>{row.firstname}</TableCell>
                    <TableCell align="left">{row.lastname}</TableCell>
                    <TableCell align="left">{row.user_location}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">{row.date_of_birth}</TableCell>

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
            placeholder="First Name"
            name="firstname"
            className="mb-5"
            onChange={handleChange}
            value={state.firstname}
          />
          <Input
            placeholder="Last Name"
            name="lastname"
            className="mb-5"
            onChange={handleChange}
            value={state.lastname}
          />
          <Input
            placeholder="Date of Birth"
            name="date_of_birth"
            className="mb-5"
            onChange={handleChange}
            value={state.date_of_birth}
          />
          <Input
            placeholder="User Location"
            name="user_location"
            className="mb-5"
            onChange={handleChange}
            value={state.user_location}
          />
          <Input
            placeholder="Email"
            name="email"
            className="mb-5"
            onChange={handleChange}
            value={state.email}
          />
          <Input
            placeholder="Username"
            name="username"
            className="mb-5"
            onChange={handleChange}
            value={state.username}
          />
          <Input.Password
            placeholder="Password"
            name="password"
            className="mb-5"
            onChange={handleChange}
            value={state.password}
          />
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default DenseTable;
