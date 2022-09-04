import React from 'react'
import { Button, Typography, styled } from '@mui/material'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import SettingsIcon from '@mui/icons-material/Settings'

export default function MuiDemo() {
  const ButtonOrange = styled(Button)({
    backgroundColor: 'orange',
    color: '#fff',
    margin: 5,
    '&:hover': {
      backgroundColor: 'skyblue',
    },
  })
  return (
    <div>
      <Button
        variant="text"
        startIcon={<SettingsOutlinedIcon />}
        color="secondary"
      >
        Text
      </Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined" color="success" endIcon={<SettingsIcon />}>
        Outlined
      </Button>
      <Typography variant="h4" component="p">
        h4. Heading
      </Typography>
      <Button
        variant="contained"
        disabled
        sx={{
          backgroundColor: 'skyblue',
          color: '#fff',
          margin: 5,
          '&:hover': {
            backgroundColor: 'orange',
          },
          '&:disabled': {
            backgroundColor: 'gray',
          },
        }}
      >
        hello world
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: 'orange',
          color: '#fff',
          margin: 5,
          '&:hover': {
            backgroundColor: 'skyblue',
          },
        }}
      >
        hello world
      </Button>
      <ButtonOrange>styled button orange</ButtonOrange>
    </div>
  )
}
