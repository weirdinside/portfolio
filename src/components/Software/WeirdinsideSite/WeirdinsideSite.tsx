import { Link } from "react-router-dom";
import styles from "./WeirdinsideSite.module.css";
import homepage from "/Software/weirdinside_homepage.gif";
import terminal from "/Software/weirdinside_terminal.png";
import music from "/Software/weirdinside_music.png";
import dev from "/Software/weirdinside_dev.png";

export default function WeirdinsideSite() {
  return (
    <div className={styles.page}>
      <p className={styles.description}>
        <Link target="_blank" to="https://weirdinsi.de" className={styles.link}>
          weirdinsi.de
        </Link>{" "}
        is my personal website. As it is currently deployed, it was created with
        Squarespace and some custom code to create the landing page. As of
        [07-21-25] I am developing a ground-up replacement for the whole site
        without the use of a PWA. Below are a few screenshots of the site as of
        [07-21-25]. The new design is meant to replicate an older version of Mac
        OS, but use small touches of its own flair.
        <br /> <br />I also built a coverflow component from scratch, as the
        more modern implementation by Bramus is reliant on features that aren't
        available on other browsers. In the future, I will be implementing his
        version with a polyfill, as the current version also has some CSS
        inconsistencies across browsers, but seems to work on most.
      </p>
      <br />
      <div className={styles.images}>
        <img className={styles.image} src={homepage} />
        <img className={styles.image} src={dev} />
        <img className={styles.image} src={music} />
        <img className={styles.image} src={terminal} />
      </div>
      <p className={styles.tech}>
        The frontend is built using React scaffolded with Vite. The main page,
        while appearing to be 3D, is just a CSS trick and not true 3D.
      </p>
    </div>
  );
}
