'use client'

import { Paper, Box } from '@mui/material'
import { useState } from 'react'

import { styled } from '@mui/material/styles'  

const Card = styled(Paper)(({ theme }) => ({
    fontSize: '30px',
    color: 'black',
    backgroundColor: 'var(--palette-sea-salt)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'max-content',
    padding: '20px'
  }));

export default function Flashcard( props ) {

    const [flipped, setFlipped] = useState(false)

    return (
        <Box 
            className="flip-card"
            width={'410px'} 
            height={'260px'} 
            margin={'100px 175px'}
            backgroundColor={'transparent'}
            borderRadius={'10px'}
        >
            <Box className={flipped ? "flip-card-inner flipped" : "flip-card-inner"} onClick={() => setFlipped(!flipped)}>
                <Card className="flip-card-front">{ props.card.question }</Card>
                <Card className="flip-card-back">{ props.card.answer }</Card>
            </Box>
            
        </Box>
    );
}