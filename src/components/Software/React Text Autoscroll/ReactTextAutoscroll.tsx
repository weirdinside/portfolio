import { Link } from "react-router-dom";
import styles from "./ReactTextAutoscroll.module.css";
import RTACodeTypescript from "./RTA Code/RTACode";
import RTADemo from "./RTA Demo/RTADemo";

export default function ReactTextAutoScroll() {
  return (
    <div className={styles.page}>
      <div className={styles.page__content}>
        <div className={styles.page__description}>
          Text-Autoscroll is a React component that I built as a replacement for
          the now deprecated HTML{" "}
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/marquee"
            className={styles.link}
            target="_blank"
            style={{ color: `#49c9af` }}
          >
            &lt;marquee/&gt;
          </a>{" "}
          tag. There are a few alternatives (
          <a
            className={styles.link}
            target="_blank"
            href="https://www.npmjs.com/package/react-simple-marquee"
          >
            react-simple-marquee
          </a>{" "}
          and{" "}
          <a
            className={styles.link}
            target="_blank"
            href="https://www.npmjs.com/package/react-fast-marquee"
          >
            react-fast-marquee
          </a>{" "}
          to name two), but none of them satisfied my exact needs and behaviors
          for the use case. This was initially developed for the homepage on{" "}
          <Link className={styles.link} to="/dev/projects/20vt">
            20vt.help
          </Link>
          , but I have used it in many other projects since. It has no
          dependencies and utilizes event listeners to keep consistency even
          when resizing the window. A demo page of it is available below and
          code snippets are available below as well.
        </div>
        <br />
       
        <div className={styles.demo}>
          <RTADemo />
        </div>
        <br />
        <h1 className={styles.heading}>## CODE</h1>
        <br />
        <RTACodeTypescript />
        <br />
      </div>
    </div>
  );
}
