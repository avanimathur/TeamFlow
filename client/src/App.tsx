import React from 'react'
import styled from 'styled-components'

import { useAppSelector } from './hooks'

import RoomSelectionDialog from './components/RoomSelectionDialog'
import LoginDialog from './components/LoginDialog'
import ComputerDialog from './components/ComputerDialog'
import WhiteboardDialog from './components/WhiteboardDialog'
import VideoConnectionDialog from './components/VideoConnectionDialog'
import Chat from './components/Chat'
import HelperButtonGroup from './components/HelperButtonGroup'
import MobileVirtualJoystick from './components/MobileVirtualJoystick'
import Button from '@mui/material/Button'

const Backdrop = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`

const MainUIWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px; /* Adjust spacing as needed */
  position: relative;
  z-index: 1;
`

function App() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn)
  const computerDialogOpen = useAppSelector((state) => state.computer.computerDialogOpen)
  const whiteboardDialogOpen = useAppSelector((state) => state.whiteboard.whiteboardDialogOpen)
  const videoConnected = useAppSelector((state) => state.user.videoConnected)
  const roomJoined = useAppSelector((state) => state.room.roomJoined)

  let ui: JSX.Element
  if (loggedIn) {
    if (computerDialogOpen) {
      /* Render ComputerDialog if user is using a computer. */
      ui = <ComputerDialog />
    } else if (whiteboardDialogOpen) {
      /* Render WhiteboardDialog if user is using a whiteboard. */
      ui = <WhiteboardDialog />
    } else {
      ui = (
        <MainUIWrapper>
          <Chat />
          {!videoConnected && <VideoConnectionDialog />}
          <MobileVirtualJoystick />
          <Button
            variant="outlined"
            color="secondary"
            style={{ background: '#05225C', color: '#FFFCFC' }}
            onClick={() => (window.location.href = '#')}
          >
            Join Interview
          </Button> 
          
          <Button
            variant="outlined"
            color="secondary"
            style={{ background: '#05225C', color: '#FFFCFC' }}
            onClick={() => (window.location.href = '#')}
          >
            Join Group Discussion
          </Button>

        </MainUIWrapper>
      )
    }
  } else if (roomJoined) {
    /* Render LoginDialog if not logged in but selected a room. */
    ui = <LoginDialog />
  } else {
    /* Render RoomSelectionDialog if yet selected a room. */
    ui = <RoomSelectionDialog />
  }

  return (
    <Backdrop>
      {ui}
      {/* Render HelperButtonGroup if no dialogs are opened. */}
      {!computerDialogOpen && !whiteboardDialogOpen && <HelperButtonGroup />}
    </Backdrop>
  )
}

export default App
