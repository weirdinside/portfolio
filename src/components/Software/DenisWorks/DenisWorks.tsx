import { Link } from "react-router-dom";
import styles from "./DenisWorks.module.css";

export default function DenisWorks() {
  return (
    <div className={styles.page}>
      <p className={styles.description}>
        <Link target="_blank" to="https://denis.works" className={styles.link}>
          denis.works
        </Link>{" "}
        is a website showcasing the my work as the artist Denis Biblioni. The
        website is modeled after the aesthetics of drum machines and samplers,
        specifically the Elektron and Octatrack by Digitakt.
        <br />   <br />
        I built and developed the site starting in August 2024, and tested
        multiple designs before landing on the current one. A huge challenge
        when building the website was figuring out the audio player, and making
        the decision to use native HTML5 audio instead of opting to use the Web
        Audio API.
        <br />   <br />
        As having a "Varispeed" (playback rate change) function was a
        requirement for the audio player, both Web Audio and HTML audio were
        viable solutions to pursue, but unfortunately there was a catch: Web
        Audio changes playback rate on iOS devices instantly, and HTML audio
        rate change requires buffering. However, Web Audio does NOT hook into
        Session API or the device navigator, and there is no way to make it do
        so - on iPhone, this means that when you close the browser, audio stops,
        and having the device on vibrate silences playback.
      </p>

      <p className={styles.tech}>
        This is a basic static website built using React (scaffolded using Vite)
        and styled from scratch using CSS modules. Parts of the website (namely
        the cassette showcase and the single album artworks for "floppy disk"
        and "password protected") also utilize ThreeJS (React Three Fiber).
      </p>
    </div>
  );
}
