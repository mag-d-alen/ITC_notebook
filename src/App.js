/** @format */

import React, { Component } from 'react';
import './css/App.css';
import AddNote from './components/AddNote';
import Archive from './components/Archive';
import Header from './components/Header';
import Note from './components/Note';
import { v4 as uuidv4 } from 'uuid';
import styled from '@emotion/styled';
import { Box } from '@mui/material';
import * as localForage from 'localforage';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      archivedNotes: [],
    };
  }

  componentDidMount() {
    localForage
      .getItem('notes')
      .then((savedNotes) => {
        savedNotes && this.setState({ notes: savedNotes });
      })
      .catch(function (err) {
        console.log(err);
      });
    localForage
      .getItem('archive')
      .then((archivedNotes) => {
        this.setState({ archivedNotes });
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  componentDidUpdate() {
    this.updateLocalForage('archive', this.state.archivedNotes);
    this.updateLocalForage('notes', this.state.notes);
  }

  addNotes = (note) => {
    const newNote = { ...note, id: uuidv4() };
    const newNotes = [...this.state.notes, newNote];
    this.setState({ notes: newNotes });
    localForage.setItem('notes', this.state.notes);
  };

  updateNote = (note) => {
    let newNotes = [...this.state.notes];
    const toReplace = newNotes.find((item) => item.id === note.id);
    newNotes[newNotes.indexOf(toReplace)] = note;
    this.setState({ notes: newNotes });
    this.updateLocalForage('notes', newNotes);
  };

  archiveNote = (note) => {
    if (window.confirm('Are you sure you want to delete your note?')) {
      const newNotes = this.state.notes;
      const archivedNotes = [...this.state.archivedNotes, note];
      const notes = newNotes.filter((item) => item.id !== note.id);
      this.setState({ notes, archivedNotes });
      console.log(archivedNotes);
      this.updateLocalForage('archive', archivedNotes);
    }
  };

  restoreNote = (note) => {
    const { notes, archivedNotes } = this.state;
    const newNotes = [...archivedNotes];
    const archivedNotesUpdted = newNotes.filter((item) => item.id !== note.id);
    this.setState({ archivedNotes: archivedNotesUpdted });
    this.addNotes(note);

    this.updateLocalForage('archive', archivedNotes);
    this.updateLocalForage('notes', notes);
  };

  updateLocalForage = (collection, noteArray) => {
    localForage
      .getItem(collection)
      .then(() => {
        console.log(collection);
        localForage.setItem(collection, noteArray);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  render() {
    const { notes } = this.state;
    return (
      <>
        <Header />
        <AddNote addNotes={this.addNotes} />
        <StyledDiv>
          {notes.map((note) => {
            return (
              <Note
                key={note.id}
                id={note.id}
                archived={false}
                title={note.title ? note.title : null}
                content={note.content}
                date={note.date}
                note={note}
                deleteNote={this.archiveNote}
                updateNote={this.updateNote}
                updateDate={
                  note.updateDate ? note.updateDate.toLocaleString() : null
                }
              />
            );
          })}
          <Archive
            restoreNote={this.restoreNote}
            savedNotes={this.state.archivedNotes}
          />
        </StyledDiv>
      </>
    );
  }
}

const StyledDiv = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;
