/** @format */

import React, { Component } from 'react';
import { Button, Box } from '@mui/material';
import Note from './Note';
import styled from '@emotion/styled';

export default class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showArchived: false,
    };
  }

  toggleShowArchived() {
    this.setState({ showArchived: !this.state.showArchived });
  }

  render() {
    const { showArchived } = this.state;
    const { savedNotes } = this.props;

    return (
      <StyledDiv>
        <Button onClick={() => this.toggleShowArchived()}>
          {!showArchived ? 'Retreive Archived Notes' : 'Hide Archived Notes'}
        </Button>

        {savedNotes.length > 0 &&
          showArchived &&
          savedNotes.map((note) => (
            <Note
              key={note.id}
              note={note}
              title={note.title}
              content={note.content}
              date={note.date}
              updateDate={note.updateDate}
              archived={true}
              restoreNote={(note) => this.props.restoreNote(note)}
            />
          ))}
      </StyledDiv>
    );
  }
}

const StyledDiv = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;
