// RTACode.tsx
import { useEffect, useRef, useState } from "react";

import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/themes/prism-tomorrow.css";

import styles from "./RTACode.module.css";
import AUTOSCROLL_TSX from "../RTA Demo/Autoscroll.tsx?raw";
import AUTOSCROLL_JSX from "../RTA Demo/Autoscroll.jsx?raw";
import AUTOSCROLL_MINI_TSX from "../RTA Demo/AutoscrollMini.tsx?raw";
import AUTOSCROLL_MINI_JSX from "../RTA Demo/AutoscrollMini.jsx?raw";
import AUTOSCROLL_TSX_NC from "../RTA Demo/Autoscroll (NO COMMENTS).tsx?raw";
import AUTOSCROLL_JSX_NC from "../RTA Demo/Autoscroll (NO COMMENTS).jsx?raw";

export default function RTACode() {
  const codeRef = useRef<HTMLElement>(null);

  const [isClicked, setIsClicked] = useState(false);
  const [file, setFile] = useState<any>({
    name: "Typescript",
    file: AUTOSCROLL_TSX,
    nc: AUTOSCROLL_TSX_NC,
  });
  const [showComments, setShowComments] = useState<boolean>(true);

  const files = [
    { name: "Javascript", file: AUTOSCROLL_JSX, nc: AUTOSCROLL_JSX_NC },
    { name: "Typescript", file: AUTOSCROLL_TSX, nc: AUTOSCROLL_TSX_NC },
    { name: "Minified JS", file: AUTOSCROLL_MINI_JSX },
    { name: "Minified TS", file: AUTOSCROLL_MINI_TSX },
  ];

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [file, showComments]);

  const handleClick = () => {
    navigator.clipboard.writeText(file);
    setIsClicked(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.selector}>
        {files.map((item) => {
          return (
            <button
              onClick={() => {
                if(!file.nc) setShowComments(false)
                setFile(item);
              }}
              className={`${styles.file__option} ${
                file.name === item.name && styles.active
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      {!file.name.includes('Minified') && (
        <div className={styles.selector}>
          <button
            onClick={() => {
              setShowComments(true);
            }}
            className={`${styles.file__option} ${
              showComments && styles.active
            }`}
          >
            Show comments
          </button>
          <button
            onClick={() => {
              setShowComments(false);
            }}
            className={`${styles.file__option} ${
              !showComments && styles.active
            }`}
          >
            No comments
          </button>
        </div>
      )}

      <div className={styles.codeview}>
        <div className={styles.codeview__body}>
          <div
            className={`${styles.copier} ${isClicked && styles.active}`}
            onClick={handleClick}
            onPointerCancel={() => {
              setIsClicked(false);
            }}
            onPointerLeave={() => {
              setIsClicked(false);
            }}
          />
          <div className={styles.codeview__overlay} />
          <pre style={{ margin: 0 }}>
            <code
              ref={codeRef}
              className="language-tsx"
              style={{
                whiteSpace: "pre-wrap",
                fontFamily: "monospace",
              }}
            >
              {Boolean(file.nc && !showComments) ? file.nc : file.file}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
