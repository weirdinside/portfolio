import { Link } from "react-router-dom";
import styles from "./BenderFilm.module.css";
import mobilePreview from "/Software/mobile_demo_bender.gif";
import desktopPreview from "/Software/desktop_demo_bender.gif";

export default function BenderFilm() {
  return (
    <div className={styles.page}>
      <p className={styles.description}>
        <Link
          target="_blank"
          to="https://weirdinside.github.io/benderfilm-site"
          className={styles.link}
        >
          bender.film
        </Link>{" "}
        is a website showcasing the work of the editorial studio Bender based in
        New York City and Los Angeles. The site is very minimal, with a focus on
        simple animations to complement the logo styling.
      </p>
      <br />
      <div className={styles.previews}>
        <img
          className={`${styles.image} ${styles.desktop}`}
          src={desktopPreview}
        />
        <img
          className={`${styles.image} ${styles.mobile}`}
          src={mobilePreview}
        />
      </div>
      <br />
      <p className={styles.tech}>
        This is a basic static website built using React (scaffolded using Vite)
        and styled from scratch using CSS modules. The playful cursor, logo
        animations and variety of other subtle animations on the site were made
        using linear css animation transitions with granular values.
      </p>
    </div>
  );
}
