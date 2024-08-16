import Image from "next/image";
import styles from "./page.module.css";
import { firestore } from '@/firebase';
import { Container, Box, Typography, AppBar, Toolbar} from '@mui/material'

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()
  
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <Box>
      <nav sx={{
        width: "calc(100% - 200px)",
        height: "75px",
        backgroundColor: "var(--palette-charcoal-blue)",
        padding: "30px 100px",
        display: 'block'
      }}>
        <img id="nav-logo" src="./mnemo-logo-dark-mode.svg"/>
        <a className="nav-link">
          Sign In
        </a>
        <a className="nav-link">
          Log In
        </a>
      </nav>

    </Box>
  );
}
