import { Link } from "react-router-dom";
import styles from "./ReactKnob.module.css";

export default function ReactKnob() {
  return (
    <div className={styles.page}>
      <div className={styles.page__description}>
        React-Knob is a component that I am currently building, but initially
        developed for use on{" "}
        <Link to="/dev/projects/denisworks" className={styles.link}>
          denis.works
        </Link>
        . It is not in use on the website at the moment, but was part of the of
        the initial audio player page design. However, I realized that the UX of
        a knob on a touch device was a bit funky and tossed the use case in the
        garbage, but have kept developing it for use on other projects.
      </div>
      <br />
      For fun, I also ran an experiment using LLMs to see how well they could
      understand and execute upon translating polar coordinates into radians for
      this project. As of March 2025, no LLM has been able to figure out the
      execution properly, despite getting the theory correct (even given
      detailed, guided prompts and several corrective prompts).
      <br />
      <p className={styles.tech}>
        As this is a node package by design, the knob itself is just a
        Typescript React component that was built with no dependencies. It is
        not published on NPM as I am still working on adding features and
        cleaning up the state management.
      </p>
    </div>
  );
}
