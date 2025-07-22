import styles from "./RTADemo.module.css";

import { useState, useRef } from "react";
import AutoscrollText from "./Autoscroll";

function RTADemo() {
  const [containerWidth, setContainerWidth] = useState(400);
  const [sampleText, setSampleText] = useState(
    "write something really long here to test out the scrolling ability"
  );

  const codeRef = useRef(null);

  const [scrollSpeed, setScrollSpeed] = useState(1);
  const [pauseTime, setPauseTime] = useState(500);
  const [alignmentOption, setAlign] = useState<"left" | "right" | "center">(
    "left"
  );

  return (
    <div className={styles["page"]}>
      <div className={styles["text"]}>
        <div className={styles["inputs"]}>
          <label className={styles["input__label"]}>
            set the text alignment for when the container is larger
            <select
              style={{
                border: "2px solid black",
                fontSize: "20px",
                borderRadius: "10px",
                padding: "10px",
              }}
              onChange={(e) => {
                e.preventDefault();
                if (
                  e.target.value === "left" ||
                  e.target.value === "right" ||
                  e.target.value === "center"
                )
                  setAlign(e.target.value);
              }}
              value={alignmentOption}
            >
              <option value={"left"}>left</option>
              <option value={"center"}>center</option>
              <option value={"right"}>right</option>
            </select>
          </label>
          <label className={styles["input__label"]}>
            set the sample text in the below field
            <input
              onChange={(e) => {
                setSampleText(e.target.value);
              }}
              type="text"
              value={sampleText}
              className={styles["text__input"]}
            />
          </label>
          <label className={styles["input__label"]}>
            set scroll speed in the below field (must be a float or int above
            zero)
            <input
              onChange={(e) => {
                if (parseFloat(e.target.value) > 0) {
                  setScrollSpeed(parseFloat(e.target.value));
                }
              }}
              step="0.1"
              type="number"
              value={scrollSpeed}
              className={styles["text__input"]}
            />
          </label>
          <label className={styles["input__label"]}>
            set pause time (in ms) in the below field (must be a number above
            zero)
            <input
              onChange={(e) => {
                if (parseInt(e.target.value) >= 0.1) {
                  setPauseTime(parseInt(e.target.value));
                }
              }}
              type="number"
              step="10"
              value={pauseTime}
              className={styles["text__input"]}
            />
          </label>
        </div>
        <br />
        <p className={styles["subheading"]}>
          the container width is {containerWidth}px. <br />
          <br />
          when the container is smaller than the width of the text inside it,
          the text will automatically scroll.
        </p>o
      </div>
          <label className={styles["input__label"]}>
            drag to change the width of the container
            <input
              onChange={(e) => {
                setContainerWidth(parseInt(e.target.value));
              }}
              type="range"
              min="1"
              max="690"
              value={containerWidth}
              className={styles["slider"]}
            />
          </label>
      <div
        style={{ fontSize: "22px", width: `${containerWidth}px` }}
        className={styles["text__container"]}
      >
        <AutoscrollText
          scrollSpeed={scrollSpeed}
          pauseTime={pauseTime}
          align={alignmentOption}
        >
          {sampleText}
        </AutoscrollText>
      </div>
      <div className={styles["codeview"]}>
        <p className={styles["subheading"]}>
          here is what the code looks like in use with the component. click
          anywhere on the snippet below to copy it.
        </p>
        <div
          ref={codeRef}
          onClick={(e: React.SyntheticEvent<HTMLDivElement>) => {
            const target = e.target as HTMLElement;
            if (target.textContent) {
              navigator.clipboard.writeText(target.textContent);
            }
          }}
          className={styles["codeview__body"]}
        >
          <div className={styles["codeview__overlay"]}></div>
          {
            <>
              <span style={{ color: `white` }}>{`<`}</span>
              <span style={{ color: "#50cfb6" }}>{`AutoscrollText`}</span>
            </>
          }{" "}
          <br />
          {
            <>
              <span style={{ color: "#b8ffff" }}>scrollSpeed</span>=
              <span style={{ color: "#1995e0" }}>{`{`}</span>
              <span style={{ color: "#c0dab1" }}>{scrollSpeed}</span>
              <span style={{ color: "#1995e0" }}>{`}`}</span>
            </>
          }
          <br />
          {
            <>
              <span style={{ color: "#b8ffff" }}>pauseTime</span>=
              <span style={{ color: "#1995e0" }}>{`{`}</span>
              <span style={{ color: "#c0dab1" }}>{pauseTime}</span>
              <span style={{ color: "#1995e0" }}>{`}`}</span>
            </>
          }
          <br />
          {
            <>
              <span style={{ color: "#b8ffff" }}>align</span>=
              <span style={{ color: "#1995e0" }}>{`{`}</span>
              <span style={{ color: "#F28C28" }}>"{alignmentOption}"</span>
              <span style={{ color: "#1995e0" }}>{`}`}</span>
              <span style={{ color: `white` }}>{`>`}</span>
            </>
          }
          <br />
          {`${sampleText}`} <br />
          {
            <>
              <span style={{ color: `white` }}>{`<`}</span>
              <span style={{ color: "#50cfb6" }}>{`/AutoscrollText`}</span>
              <span style={{ color: `white` }}>{`>`}</span>
            </>
          }{" "}
          <br />
        </div>
      </div>
    </div>
  );
}

export default RTADemo;
