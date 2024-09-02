import Box from '@mui/material/Box';
import MiniDrawer from  '../../components/saidbar'
import Hospital from '../../components/hospital'; 
interface DashboardProps {
    relout: boolean;
    setRelout: React.Dispatch<React.SetStateAction<boolean>>;
  }
const Home: React.FC<DashboardProps> =({setRelout, relout}) => {
    return (
        <div className='container'>
            <Box  sx={{ display: 'flex' }}>
        <MiniDrawer/>
             <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Hospital  relout={relout} setRelout={setRelout} />
 
            </Box>
      
      </Box>
            
        </div>
    );
}

export default Home;
