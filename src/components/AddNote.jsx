/** @format */

import React, { Component } from 'react';
import { TextField, Input, Button, Box, FormControl } from '@mui/material';
import styled from '@emotion/styled';

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      date: new Date().toLocaleString(),
    };
  }

  handleTitleChange(e) {
    this.setState({ title: e.target.value });
  }

  handleContentChange(e) {
    this.setState({ content: e.target.value });
  }

  handleClick(e) {
    e.preventDefault();
    this.props.addNotes(this.state);
    this.setState({ title: '', content: '' });
  }

  render() {
    return (
      <StyledWrapper>
        <FormControl
          className='form'
          action='submit'
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <Input
            value={this.state.title}
            onChange={(e) => this.handleTitleChange(e)}
            name='title'
            id='outlined filled'
            placeholder='Title'
            variant='outlined'
            autoComplete='off'
          ></Input>
          <TextField
            value={this.state.content}
            onChange={(e) => this.handleContentChange(e)}
            label='Content'
            multiline
            variant='outlined'
            autoComplete='off'
          />
          <Button
            variant='outlined'
            color='success'
            onClick={(e) => {
              this.handleClick(e);
            }}
          >
            Add note
          </Button>
        </FormControl>
      </StyledWrapper>
    );
  }
}
const StyledWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: lightgray;
`;
