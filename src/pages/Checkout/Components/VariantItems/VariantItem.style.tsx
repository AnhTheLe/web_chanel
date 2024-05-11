import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      flex: 100,
      background: theme.palette.customColors.background.main,
      padding: '16px',
      height: '100%',
      width: '70%',
      overflowY: 'auto'
    },
    lineItemsEmpty: {
      background: '#F4F5F5',
      flex: 100,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
    body: {
      marginTop: '18px'
    },
    generalInformation: {
      background: '#fff',
      borderRadius: '8px',
      width: '100%',
      paddingBottom: 12
    },
    note: {
      marginTop: '12px',
      '& .MuiIconButton-root': {
        paddingLeft: 0
      }
    },
    label: {
      maxWidth: '100%',
      display: 'flex',
      flexWrap: 'nowrap',
      fontSize: '14px',
      marginBottom: '4px',
      fontWeight: 400,
      '&:after': {
        content: "' *'",
        color: '#EB4444'
      }
    },
    labelNoAfter: {
      maxWidth: '100%',
      display: 'flex',
      flexWrap: 'nowrap',
      fontSize: '14px',
      marginBottom: '4px',
      fontWeight: 400
    },
    photoDocument: {
      background: '#fff',
      borderRadius: '8px',
      width: '100%',
      paddingBottom: 12
    },
    dropImageBox: {
      padding: '0px 16px',
      justifyContent: 'space-between',
      borderRadius: '8px',
      '& .MuiTypography-root': {
        margin: '0 12px'
      },
      '& [for=raised-button-file]': {
        fontWeight: 500,
        fontSize: '14px',
        flexShrink: 0,
        width: '130px',
        height: '40px',
        border: '1px solid #DBDDDF',
        borderRadius: '4px',
        backgroundColor: '#EDEEEF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        cursor: 'pointer'
      }
    },
    hover: {
      '&:hover': {
        cursor: 'pointer',
        textDecoration: 'underline'
      }
    },
    imageList: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      gridGap: '12px',
      marginTop: '16px',
      padding: '0 16px'
    },
    showImage: {
      position: 'absolute',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 0,
      right: 0,
      width: '48px',
      height: '48px',
      border: '1px solid #DBDDDF',
      borderRadius: '8px',
      zIndex: 9,
      opacity: 0,
      background:
        'linear-gradient(0deg, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.50) 100%), lightgray 4.286px 16.751px / 82.143% 30.204% no-repeat'
    },
    imageContainer: {
      position: 'relative',
      '&:hover $showImage': {
        opacity: 0.7
      },
      marginRight: '14px'
    },
    quantity: {
      position: 'absolute',
      top: '-5px',
      right: '-5px',
      '&:hover': {
        cursor: 'pointer'
      },
      background: '#4e8ff1',
      borderRadius: '36px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      fontSize: 12,
      width: '16px',
      height: '16px',
      zIndex: 100
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
    },
    addFileIcon: {
      '& [for=raised-button-file]': {
        cursor: 'pointer'
      }
    },
    flexBoxLeft: {
      flex: ' 2 2 65%',
      minWidth: '65%',
      background: '#fff',
      borderRadius: 12,
      boxShadow: ' 0px 0px 32px -4px rgba(22, 24, 27, 0.12)'
    }
  };
});

export default useStyles;
