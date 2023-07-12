import React from 'react'

import Dashboard from './dashboard'
import Add from './add'
import Delete from './delete'
import Update from './update'
import { Box, Typography,Button } from '@mui/material'

export default function Books() {
  return (
    <div>
        <Box sx={{ml:14}}>

        <Typography variant='h3'>Books</Typography> 
        <Button>Add Book</Button>
        <Dashboard />

        </Box>


      
    </div>
  )
}
