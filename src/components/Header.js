/** @format */

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import styled from '@emotion/styled';

export default function Header(props) {
  //     toggle(){
  // props.toggleShowArchived()
  //     }

  return (
    <StyledHeader sx={{ flexGrow: 1 }}>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          NoteMaker
        </Typography>
        {/* <Button onClick={() => toggle() }> */}
      </Toolbar>
    </StyledHeader>
  );
}

const StyledHeader = styled(Box)`
  background-color: #858c94;
  font-family: 'Lato';
  color: white;
  display: flex;

  justify-content: center;
  align-items: center;
  padding: 1rem;
`;
