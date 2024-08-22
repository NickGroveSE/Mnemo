"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStripe } from "@/utils/get-stripe";
import { useSearchParams } from "next/navigation";
import { Typography } from "@mui/material";

const ResultPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCheckoutSession = async () => {
      if (!session_id) return;

      try {
        const res = await fetch(
          `/api/checkout_session?session_id=${session_id}`
        );

        const sessionData = await res.json();

        if (res.ok) {
          setSession(sessionData);
        } else {
          setError(sessionData.error);
        }
      } catch (err) {
        setError("An error occurred while retrieving the session.");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutSession();
  }, [session_id]);

  if (loading) {
    return (
      <Container maxWidth="100vw" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="100vw" sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="100vw" sx={{ textAlign: "center", mt: 4 }}>
      ( session.paymentStatus === paid ? (
      <>
        <Typography variant="h4"> Thank you for purchasing</Typography>{" "}
        <Box sx={{ mt: 22 }}>
          <Typography variant="h6">Session ID: {session_id}</Typography>
          <Typography variant="body 1">
            We have received your payment and will recieve an e-mail with your
            order details shortly.
          </Typography>
        </Box>
      </>
      ) : (
      <>
        <Typography variant="h4"> Payment Failed</Typography>{" "}
        <Box sx={{ mt: 22 }}>
          <Typography variant="body 1">
            Your payment was not successful. Please try again. 
          </Typography>
        </Box>
      </>
      ) )
    </Container>
  );
};

export default resultPage;
