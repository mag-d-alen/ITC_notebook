/** @format */

import React, { Component } from 'react';
import { Input, Button, Box, Alert } from '@mui/material';
import styled from '@emotion/styled';

import moment from 'moment';

moment().format();

export default class Reminder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reminderDate: '',
      reminderTime: '',
      reminderSet: false,
      isOpen: false,
    };
  }

  handleSetReminder(timer) {
    window.clearTimeout(timer);
    const futureDate = new Date(
      `${this.state.reminderDate}:${this.state.reminderTime}`
    ).getTime();
    const nowInMS = Date.now();
    const timeLapse = Math.floor(futureDate - nowInMS);

    timer = setTimeout(() => {
      this.setOpen();
      this.setState({ reminderSet: false });
    }, timeLapse);
  }

  setReminderDate = (e) => {
    const reminderDate = e.target.value;
    this.setState({ reminderDate });
  };

  setReminderTime = (e) => {
    const newTime = e.target.value;
    this.setState({ reminderTime: newTime });
  };

  checkReminderSet() {
    const { reminderTime, reminderDate } = this.state;
    if (reminderTime && reminderDate) {
      this.setState({ reminderSet: true });
      this.handleSetReminder();
    }
  }
  setOpen() {
    this.setState({ isOpen: true });
  }
  setClose() {
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen, reminderDate, reminderTime, reminderSet } = this.state;
    return (
      <StyledBox>
        {!isOpen && reminderSet && (
          <Alert severity='success'>
            reminder set on {reminderDate} at {reminderTime}
          </Alert>
        )}
        {isOpen && (
          <Alert severity='error' onClick={() => this.setClose()}>
            <strong> Reminder! </strong> It is {reminderDate}
            {reminderTime} now, don't forget your tasks!
          </Alert>
        )}
        Set reminder
        <Input
          type='date'
          onChange={(e) => this.setReminderDate(e)}
          value={reminderDate}
        />
        <Input
          type='time'
          value={reminderTime}
          onChange={(e) => this.setReminderTime(e)}
        />
        <Button onClick={() => this.checkReminderSet()}>Set Reminder</Button>
      </StyledBox>
    );
  }
}
const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  padding: 1rem;
  margin: 1rem;
`;
