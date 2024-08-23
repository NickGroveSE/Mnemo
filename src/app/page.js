"use client";

import {
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import Generate from "./generate/page.js"
import { useState, useEffect } from "react";
import getStripe from "./utils/getStripe";
import {
  SignedIn,
  SignedOut
} from '@clerk/nextjs'

export default function Home() {

  const [position, setPosition] = useState(0);

  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_session", {
      method: "POST",
      headers: {
        origin: "https://localhost:3000", // Change when deployed
      },
    });

    const checkoutSessionJson = await checkoutSession.json();

    if (checkoutSession.statusCode == "500") {
      console.error(checkoutSession.message);
      return;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });

    if (error) {
      console.warn(error.message);
    }
  };

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
      
        <Box sx={{          
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: '100vw'
        }}>
          <Box sx={{ my: 6}}>
            <Typography variant="h4" gutterBottom>
              Pricing
            </Typography>
            <Grid container>
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "grey.300",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5">Basic</Typography>
                  <Typography variant="h6">$5 / Month</Typography>
                  <Typography>Access to flashcard features</Typography>
                  <Button variant="contained" color="primary">
                    Choose Basic
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: 3,
                    border: "1px solid",
                    borderColor: "grey.300",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h5">Pro</Typography>
                  <Typography variant="h6">$10 / Month</Typography>
                  <Typography>Unlimited flashcards and storage</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  >
                    Choose Pro
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </SignedIn>
    </Box>
  );
}

