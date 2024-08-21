// user input and flashcards page

'use client'

import { useState } from 'react'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,    
  Card,           
  CardContent,
} from '@mui/material'
import Flashcard from '../components/flashcard.js'

export default function Generate() {
  const [text, setText] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const [position, setPosition] = useState(0)

  const handleSubmit = async () => {
    // We'll implement the API call here
    if (!text.trim()) {
        alert('Please enter some text to generate flashcards.')
        return
      }
    
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          body: text,
        })
    
        if (!response.ok) {
          throw new Error('Failed to generate flashcards')
        }
    
        const data = await response.json()
        setFlashcards(data)
      } catch (error) {
        console.error('Error generating flashcards:', error)
        alert('An error occurred while generating flashcards. Please try again.')
      }
  }

  return (
    <Container maxWidth="md"
    height={"max-content"}
    >
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Flashcards
        </Typography>
        <TextField
          id="text-field"
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
        >
          Generate Flashcards
        </Button>
      </Box>
      
      {/* We'll add flashcard display here */}
      {flashcards.length > 0 && (
        <Box sx={{ mt: 4 }}>
            <Box 
              width={'800px'}
              height={'500px'}
              position={'relative'}
            >
              <Flashcard card={flashcards[position]}/>
              <Box className="next-button" id="left-button" onClick={function(){if(position==0){setPosition(0)}else{setPosition(position-1)}}}>
                Previous
              </Box>
              <Box className="next-button" id="right-button" onClick={function(){if(position==flashcards.length-1){setPosition(flashcards.length-1)}else{setPosition(position+1)}}}>
                Next
              </Box>
            </Box>

        </Box>
        )}
        
    </Container>
  )
}