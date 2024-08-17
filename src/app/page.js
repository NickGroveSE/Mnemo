import Image from "next/image";
import styles from "./page.module.css";
import { firestore } from '@/firebase';
import { Container, Box, Typography, AppBar, Toolbar} from '@mui/material'
import Flashcard from "../components/flashcard.js"

export default function Home() {

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
        {/* <a className="nav-link">
          Sign In
        </a>
        <a className="nav-link">
          Log In
        </a> */}
      </nav>

      <Box sx={{
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
        height: 'calc(100vh - 160px)'
      }}>
        <Flashcard/>
      </Box>

    </Box>
  );
}
