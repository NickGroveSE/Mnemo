"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { firestore } from "@/firebase";
import {
  Container,
  Box,
  Typography,
  AppBar,
  Toolbar,
  Grid,
  Button,
} from "@mui/material";
import Flashcard from "../components/flashcard.js";
import { useState } from "react";
import getStripe from "./utils/getStripe";

export default function Home() {
  const cards = [
    {
      question: "What is the capital of France?",
      answer: "Paris",
    },
    {
      question: "What is the chemical symbol for water?",
      answer: "H2O",
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      answer: "Harper Lee",
    },
    {
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter",
    },
    {
      question: "What year did the Titanic sink?",
      answer: "1912",
    },
    {
      question: "Who is known as the 'Father of Computers'?",
      answer: "Charles Babbage",
    },
    {
      question: "What is the speed of light in a vacuum?",
      answer: "299,792,458 meters per second",
    },
    {
      question: "What is the smallest prime number?",
      answer: "2",
    },
    {
      question: "In which continent is the Sahara Desert located?",
      answer: "Africa",
    },
    {
      question: "What is the process by which plants make their food?",
      answer: "Photosynthesis",
    },
  ];

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
      <nav
        sx={{
          width: "calc(100% - 200px)",
          height: "75px",
          backgroundColor: "var(--palette-charcoal-blue)",
          padding: "30px 100px",
          display: "block",
        }}
      >
        <img id="nav-logo" src="./mnemo-logo-dark-mode.svg" />
        <a className="nav-link">Sign Up</a>
        <a className="nav-link">Log In</a>
      </nav>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "calc(100vh - 160px)",
        }}
      >
        <Box
          width={"80vw"}
          fontSize={"40px"}
          textAlign={"center"}
          fontWeight={"bold"}
        >
          Mnemo is your seemless and sleek solution to acing your next exam
        </Box>
        {
          <Box width={"800px"} height={"500px"} position={"relative"}>
            <Flashcard card={cards[position]} />
            <Box
              className="next-button"
              id="left-button"
              onClick={function () {
                if (position == 0) {
                  setPosition(0);
                } else {
                  setPosition(position - 1);
                }
              }}
            >
              Previous
            </Box>
            <Box
              className="next-button"
              id="right-button"
              onClick={function () {
                if (position == cards.length - 1) {
                  setPosition(cards.length - 1);
                } else {
                  setPosition(position + 1);
                }
              }}
            >
              Next
            </Box>
          </Box>
        }
      </Box>
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" gutterBottom>
          Pricing
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
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
  );
}
