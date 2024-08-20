import { Box } from "@mui/material";
import MiniDrawer from "../../components/saidbar";
import { Outlet } from "react-router-dom";
import DataTable from "../../components/datatable";
const Dashboard: React.FC=() => {

    return (
       <>
       <div className="container">
       <Box  sx={{ display: 'flex' }}>
        <MiniDrawer/>
        <Outlet />
             <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DataTable/>
            </Box>
      
      </Box>
       </div>
       </>
    );
}

export default Dashboard;
