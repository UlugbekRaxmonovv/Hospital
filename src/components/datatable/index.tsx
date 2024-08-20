import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

interface DataType {
  id: string;
  title: string;
  price: number;
  url: string[];
  category: string;
  desc: string;
}

const DenseTable: React.FC = ()=> {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [img, setImg] = useState<boolean>(true);


setTimeout(() =>{
    setImg(false);
},700)
  useEffect(() => {
    setLoading(true);
    axios
      .get('https://667fec3456c2c76b495a8d83.mockapi.io/cards')
      .then(response => {
        setData(response.data)
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, []);

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
            loading ?   <Box sx={{ display: 'flex ', color:"white", justifyContent:'center', alignItems:'center', position:'absolute', width:'100%', height:'100vh', top:'0', left:'0', backgroundColor:'rgba(0, 0, 0, 0.2) ', zIndex:9999}}>
            <CircularProgress  color="inherit"  />
          </Box>
          :
          <></>
          }
        
          <TableBody>
            {data.map((row,inx) => (
              <TableRow
                key={inx}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {inx + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.category}</TableCell>
                <TableCell align="left">{row.desc}</TableCell>
                <TableCell align="left">
                   <Box sx={{width:"50px",height:"40px", overflow:'hidden'  }}>
                   <div className="w-full h-full">
                        <img  src={row.url[0]} className={` ${!img ? "blur_none" : 'blur'}  w-[50px] h-[50px] object-contain cursor-pointer`} alt="" />
                   </div>

                   </Box>
                </TableCell>
                <TableCell align="left" >
                <div className="flex space-x-2">
        <button className="bg-slate-700 text-white px-2 py-1 rounded"   >Edit</button>
        <button
          className="bg-red-600 text-white px-2 py-1 rounded">
          Delete
        </button>
      </div>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>

          {
            
          }
        </Table>
      </TableContainer>
    </div>
  );
}
export default DenseTable;