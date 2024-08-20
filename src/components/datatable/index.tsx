import React, { useEffect, useState } from "react";
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
import { Modal } from "antd";
import Edit from '../../components/edit';

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

const DenseTable: React.FC<DenseTableProps> = ({ relout, setRelout }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [img, setImg] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<DataType | null>(null);

  const handleEditSubmit = (row: DataType) => {
    setIsModalOpen(row);
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

  setTimeout(() =>{
    setImg(false);
},700)

  return (
    <div className="w-full">
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
          {
        loading ?   <Box
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
                        : 
                          <></>
                         } 
          <TableBody>
            {data.map((row, inx) => (
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
                    <button className="bg-red-600 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isModalOpen  ? 
      
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
    
  :
  <></>
  }
    </div>
  );
};

export default DenseTable;
