'use client'


import { Box } from '@mui/material'
import Generate from "./generate/page.js"
import { useState, useEffect } from 'react'
import {
  SignedIn,
  SignedOut
} from '@clerk/nextjs'
import { light } from '@mui/material/styles/createPalette';

export default function Home() {

  return (
    <Box>
      <SignedOut>
      <Box sx={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%',
          height: 'calc(100vh - 160px)',
        }}>
          <Box sx={{
            fontSize: '50px',
            fontWeight: 'light',
            textAlign: 'center',
            width: '80%',
            letterSpacing: '-3px'
          }}>
            Mnemo is your seamless and sleek solution to acing your next exam
          </Box>
          
        </Box>
      </SignedOut>
      <SignedIn>
        <Box sx={{
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100%',
          height: 'calc(100vh - 160px)'
        }}>
          <Generate/>
        </Box>
      </SignedIn>
    </Box>
  );
}

