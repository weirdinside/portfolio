import { Link } from "react-router-dom";
import styles from "./ReesClub.module.css";

export default function ReesClub() {
  return (
    <div className={styles.page}>
      <p className={styles.description}>
        <Link target="_blank" to="https://rees.club" className={styles.link}>
          rees.club
        </Link>{" "}
        is a portfolio site for Michael Rees, a filmmaker and director that I
        became friends with through my career in music. In late 2024, Michael
        mentioned to me that he had a hard time using PWAs like Wix to show his
        catalog of work online and update it with ease - so, I offered to create
        a simple, easily maintainable app for him to update and present his
        work. <br />
        <br /> Initially, I simply re-implemented the design he had made using
        Wix and created a custom backend for him. In February 2025, he consulted
        me about a ground up redesign. I overhauled the frontend with a new
        design I created given inspiration he had presented to me, and updated
        the backend to reflect the new organization patterns and features.
        <br />
        <br /> The latest revision of the website (published May 2025) allows
        Michael to log in, change the description and display of various
        elements on the site, and add, edit and delete projects on the site. He
        can also add custom thumbnails to works on the site if the embedded ones
        do not suffice. Michael also requested an ambient sound player for the
        website, which I built using{" "}
        <Link
          className={styles.link}
          target="_blank"
          to="https://react.dev/reference/react/useContext"
          style={{ color: `#61DBFB` }}
        >
          {" "}
          React Context
        </Link>{" "}
        and HowlerJS.
      </p>
      <br />
      <p className={styles.tech}>
        This app is a basic MERN stack app, using MongoDB and Express for the
        backend, and React (scaffolded using Vite) for the frontend. Mongoose is
        used as an ODM for MongoDB, and a minimal amount of supporting packages
        are used.{" "}
        <Link
          className={styles.link}
          style={{ color: `#49c9af` }}
          to="/software/react-autoscroll-text"
        >
          <span style={{ color: `gray` }}>{`<`}</span>
          {`TextAutoscroll /`}
          <span style={{ color: `gray` }}>{`>`}</span>
        </Link>{" "}
        can also be found in use on this website on the{" "}
        <Link
          className={styles.link}
          target="_blank"
          to="https://rees.club/work"
        >
          work page
        </Link>
        .
      </p>
    </div>
  );
}
