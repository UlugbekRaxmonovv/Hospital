import { Box } from "@mui/material";
import MiniDrawer from "../../components/saidbar";
import { Outlet } from "react-router-dom";
import DataTable from "../../components/datatable";

interface DashboardProps {
    relout: boolean;
    setRelout: React.Dispatch<React.SetStateAction<boolean>>;
  }
const Dashboard: React.FC<DashboardProps> = ({ relout, setRelout }) => {

    return (
       <>
       <div className="container">
       <Box  sx={{ display: 'flex' }}>
        <MiniDrawer/>
        <Outlet />
             <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DataTable  relout={relout} setRelout={setRelout} />
            </Box>
      
      </Box>
       </div>
       </>
    );
}

export default Dashboard;
