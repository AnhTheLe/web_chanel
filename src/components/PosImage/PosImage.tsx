import React, { memo, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';


import useStyles from './PosImage.style';
import { Box, Fade, Paper, Popper } from '@mui/material';
import IconImage from 'src/assets/svg/IconImage';

interface PosImageProps {
  src: string | undefined;
  alt?: string;
  size?: 'medium' | 'large';
  hoverPopup?: boolean;
}

const getSize = (size?: string) => {
  switch (size) {
    case 'medium':
      return {
        width: '52px',
        height: '52px'
      };
    case 'large':
      return {
        width: '60px',
        height: '60px'
      };
    default:
      return {
        width: '46px',
        height: '46px'
      };
  }
};

const PosImage = (props: PosImageProps) => {
  const classes = useStyles();
  const { src, alt, size, hoverPopup } = props;
  const imageSize = getSize(size);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      className={classes.root}
      style={{
        ...imageSize
      }}
    >
      {src ? (
        <img src={src} alt={alt || ''} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
      ) : (
        <IconImage />
      )}
      {hoverPopup &&
        (src ? (
          <Box className={classes.popup}>
            <Popper
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              placement='right'
              transition
              disablePortal
              modifiers={{
                offset: {
                  enabled: true,
                  offset: '0, 20px'
                }
              }}
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper className={classes.popImage}>
                    <img src={src} alt={alt || ''} style={{ maxHeight: 200, maxWidth: 200, borderRadius: 8 }} />
                  </Paper>
                </Fade>
              )}
            </Popper>
          </Box>
        ) : null)}
    </Box>
  );
};

export default PosImage;
