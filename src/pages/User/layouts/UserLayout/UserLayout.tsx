import { Outlet } from 'react-router-dom';
import UserSideNav from '../../components/UserSideNav';
import { Grid } from '@mui/material';

export default function UserLayout() {
  return (
    <Grid margin={'36px 0px'} container justifyContent='center' wrap='wrap'>
      <Grid
        item
        xs={11}
        sm={10}
        md={8}
        sx={{
          display: 'flex',
          alignItems: 'center',
          minHeight: '50px',
          padding: '0 20px'
        }}
      >
        <div className=' py-16 text-sm text-gray-600'>
          <div className='container'>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-12'>
              <div className='md:col-span-3 lg:col-span-2'>
                <UserSideNav />
              </div>
              <div className='md:col-span-9 lg:col-span-10'>
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}
