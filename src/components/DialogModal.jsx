/** @format */
import React, { Component } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';

export default class FormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      note: {
        id: this.props.id,
        title: this.props.title,
        content: this.props.content,
        date: this.props.date,
        updateDate: new Date().toLocaleString(),
      },
    };
  }
  handleOpen = () => {
    this.setState({ isOpen: true });
  };
  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleUpdate = (e) => {
    this.props.updateNote(this.state.note);
    this.handleClose();
  };

  handleContentChange = (e) => {
    const noteState = this.state.note;
    for (const content in noteState) {
      noteState.content = e.target.value;
      this.setState({ note: noteState });
    }
  };
  handleTitleChange = (e) => {
    const noteState = this.state.note;
    for (const title in noteState) {
      noteState.title = e.target.value;
      this.setState({ note: noteState });
    }
  };
  render() {
    const { title, content } = this.state.note;
    const { isOpen } = this.state;
    return (
      <div>
        <Button
          variant='outlined'
          onClick={() => {
            this.handleOpen();
          }}
        >
          open and update
        </Button>
        <Dialog open={isOpen} onClose={this.handleClose}>
          {' '}
          <DialogContent>
            <DialogContentText>{title}</DialogContentText>
            <TextField
              margin='dense'
              id='name'
              label={'update title'}
              type='text'
              fullWidth
              variant='standard'
              onChange={this.handleTitleChange}
            />

            <DialogContentText>{content}</DialogContentText>

            <TextField
              margin='dense'
              id='name'
              label='update content'
              type='text'
              fullWidth
              variant='standard'
              onChange={this.handleContentChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => this.handleUpdate(e)}>Update</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
