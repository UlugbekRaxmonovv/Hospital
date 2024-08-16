import Box from '@mui/material/Box';
import MiniDrawer from  '../../components/saidbar'
const Home = () => {
    return (
        <div className='container'>
            <Box  sx={{ display: 'flex' }}>
        <MiniDrawer/>
             <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <h1>Home Admin</h1>
            </Box>
      
      </Box>
            
        </div>
    );
}

export default Home;
