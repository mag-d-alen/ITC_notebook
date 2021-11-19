/** @format */

import React from 'react';
import { Paper, Button, Box } from '@mui/material';
import styled from '@emotion/styled';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FormDialog from './DialogModal';

export default function Note(props) {
  const {
    title,
    content,
    date,
    id,
    updateDate,
    updateNote,
    restoreNote,
    deleteNote,
    note,
    archived,
  } = props;

  return (
    <StyledPaper elevation={3}>
      <h2>{title}</h2>
      <h3>{content}</h3>
      <p>
        <sub>Created on: {date}</sub>
      </p>
      <sub>{updateDate && `Updated on: ${updateDate}`}</sub>
      {!archived ? (
        <Box>
          <Button onClick={() => deleteNote(note)}>
            <DeleteOutlineIcon />
          </Button>
          <FormDialog
            title={title}
            content={content}
            date={date}
            id={id}
            updateNote={updateNote}
            updateDate={updateDate}
          />
        </Box>
      ) : (
        <Box>
          <Button variant='outlined' onClick={() => restoreNote(note)}>
            restore note
          </Button>
        </Box>
      )}
    </StyledPaper>
  );
}

const StyledPaper = styled(Paper)`
  padding: 1.5rem;
  dislay: flex;
  flex-direction: column;
  margin: 0.5rem;
  font-family: 'Lato', sans-serif;
`;
