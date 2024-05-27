import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      width: '100%'
    },
    '& .MuiTableCell-root': {
      padding: 8
    },
    link: {
      color: '#2F80ED',
      '&:hover': {
        color: '#333',
        textDecoration: 'underline'
      }
    },
    imageContainer: {
      position: 'relative',
      '&:hover $showImage': {
        opacity: 0.7
      },
      marginRight: '14px'
    },
    imageItem: {
      border: '1px solid #DBDDDF',
      flexShrink: 0,
      borderRadius: '8px',
      width: '48px',
      height: '48px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      objectFit: 'cover',
      overflow: 'hidden'
    }
  };
});

export default useStyles;
