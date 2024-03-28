import { Box, styled } from '@mui/material';

const PREFIX = 'MyCard';
export const classes = {
  root: `${PREFIX}-root`,
  rootImg: `${PREFIX}-rootImg`,
  searchIcon: `${PREFIX}-searchIcon`,
  button: `${PREFIX}-button`,
  img: `${PREFIX}-img`
};
export const Root = styled(Box)(({ theme }) => ({
  [`&.${classes.root}`]: {
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center'
    position: 'relative'
  },
  [`&.${classes.rootImg}`]: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 8,
    position: 'relative',
    padding: 10,
    width: 232,
    height: 232,
    marginBottom: 16,
    border: 'solid 1px #F2F2F2',
    '&:after': {
      content: "''",
      width: '100%',
      height: '100%',
      position: 'absolute',
      background: '#000',
      top: 0,
      left: 0,
      right: 0,
      opacity: 0
    },
    '&:hover': {
      transform: 'translateY(0)',
      cursor: 'pointer',
      zIndex: 10,
      [`&.${classes.rootImg}:after`]: {
        // '&:after': {
        //   opacity: 0.5
        // }
        opacity: 0.5
      },
      [`& .${classes.button}`]: {
        opacity: 1
      },
      [`& .${classes.searchIcon}`]: {
        opacity: 1
      }
    }
  },
  [`& .${classes.img}`]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    objectFit: 'cover'
  },
  [`& .${classes.img} img`]: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
    overFlowClipMargin: 'content-box',
    transition: 'all 0.3s'
  },
  [`& .${classes.searchIcon}`]: {
    width: 48,
    height: 48,
    zIndex: 10,
    backgroundColor: '#000',
    border: 'solid 1px #ffb9a4',
    background: '#fff4f0',
    position: 'absolute',
    bottom: 'calc(50%)',
    display: 'flex',
    opacity: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  [`& .${classes.button}`]: {
    textAlign: 'center',
    color: '#a05139',
    fontSize: 16,
    position: 'absolute',
    opacity: 0,
    bottom: '10x',
    zIndex: 10,
    left: '10px',
    width: 'calc(100% - 20px)',
    backgroundColor: '#ffb9a4',
    transform: 'translateY(180px)',
    transition: 'all 0.5s',
    '&:hover': {
      backgroundColor: '#fff4f0'
    }
  }
}));
