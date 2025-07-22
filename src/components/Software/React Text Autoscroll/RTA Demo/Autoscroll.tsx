import { useState, useEffect, useRef, useMemo, useCallback } from "react";

// ------------------------------------ //
//                 TYPES                //
// ------------------------------------ //

interface AutoscrollTextProps {
  trigger?: boolean | number | string; // this is a value that changes to trigger the effect
  scrollSpeed?: number; // number greater than 0
  pauseTime?: number; // pause time before and after the marquee runs
  children: string; // this is where the text goes
  align?: "left" | "right" | "center"; // alignment of the text if the text doesn't exceed the parent width
}

// ------------------------------------ //
//              COMPONENT               //
// ------------------------------------ //

export default function AutoscrollText({
  children,
  trigger = true,
  scrollSpeed = 1,
  pauseTime = 500,
  align = "left",
}: AutoscrollTextProps) {
  // on page load, set style and transition: right 0px and transition to true
  // when the children change, recalculate and retrigger.

  // ------------------------------------ //
  //                STATES                //
  // ------------------------------------ //

  const [scrollTime, setScrollTime] = useState<number>(0); // stores scrollTime variable after calculation in checkWindowSize hook
  const [containerWidth, setContainerWidth] = useState<number>(0); // again, arbitrary number but tracks container width
  const [difference, setDifference] = useState<number>(0); // the int value of the pixel value to move the text
  const [textStyle, setTextStyle] = useState<React.CSSProperties>({}); // stores the states to be animated between. set on an interval

  // ------------------------------------ //
  //                  REFS                //
  // ------------------------------------ //

  const marqueeRef = useRef<HTMLDivElement>(null); // reference for the parent container (if marquee is to be active, this is smaller)
  const textRef = useRef<HTMLParagraphElement>(null); // reference for the text container (if marquee is to be active, this is larger)
  const intervalRef = useRef<ReturnType<typeof setInterval>>(null);

  // ------------------------------------ //
  //               UTILITIES              //
  // ------------------------------------ //

  const intervalTime = useMemo(() => {
    return scrollTime + pauseTime * 2;
  }, [scrollTime, pauseTime]);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const setStylesSequentially = useCallback(async () => {
    let isCancelled = false;

    setTextStyle(() => ({
      position: `absolute`,
      textWrap: `nowrap`,
      transition: `none`,
      right: `${-difference}px`,
    }));

    await delay(20);
    if (isCancelled) return;

    setTextStyle(() => ({
      position: `absolute`,
      textWrap: `nowrap`,
      transition: `${scrollTime}ms linear ${pauseTime}ms`,
      right: "0px",
    }));

    return () => {
      isCancelled = true;
    };
  }, [difference, pauseTime, scrollTime]);

  // used in the loopSet hook
  const resetText = useCallback(() => {
    setTextStyle({
      position: `absolute`,
      textWrap: `nowrap`,
      transition: `none`,
      right: `${-difference}px`,
    });
  }, [difference]);

  // ------------------------------------ //
  //                 HOOKS                //
  // ------------------------------------ //

  // is run when the window size is changed or the marquee element is triggered
  useEffect(
    function checkWindowSize() {
      function measureSizes() {
        if (textRef.current && marqueeRef.current) {
          const textWidth = textRef.current.offsetWidth;
          const containerW = marqueeRef.current.offsetWidth;
          const diff = textWidth - containerW;

          setContainerWidth(containerW);
          setDifference(diff);
          setScrollTime(diff * 21 * (1 / scrollSpeed));
        }
      }

      measureSizes();
    },
    [scrollSpeed, children, trigger]
  );

  // set the initial style before rendering the rest
  useEffect(
    function setInitialStyle() {
      function getAlignmentStyle(): React.CSSProperties {
        const baseStyle = {
          position: "absolute",
          textWrap: "nowrap",
          transition: "none",
        };

        if (difference > 0) {
          return {
            ...baseStyle,
            right: `${-difference}px`,
          } as React.CSSProperties;
        }

        switch (align) {
          case "left":
            return { ...baseStyle, left: "0px" } as React.CSSProperties;
          case "right":
            return { ...baseStyle, right: "0px" } as React.CSSProperties;
          case "center":
            return {
              ...baseStyle,
              left: "0",
              right: "0",
              marginInline: "auto",
              width: "fit-content",
            } as React.CSSProperties;
        }
      }
      setTextStyle(getAlignmentStyle);
    },
    [scrollTime, pauseTime, align, difference]
  );

  // sets an interval for the classes to be set on the text.
  // the return function clears the interval (eg., a re-render will cause the loop to break and reset)
  // necessary deps:
  // - difference, intervalTime, setStylesSequentially, resetText
  // other deps:
  // - align (unless this is set by a variable, it does not need to be a cause for re-render)
  // - pauseTime (unless this is set by a variable, it does not need to be a cause for re-render)
  // - children(unless this is set by a variable, it does not need to be a cause for re-render - although more likely than the last 2)
  // - containerWidth(necessary, since width of the container changing is cause for a re-render)
  // - trigger (if this is provided, this needs to be a dep as mouseOver would be cause for a re-render)

  useEffect(
    function loopSet() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (difference > 0 && trigger) {
        intervalRef.current = setInterval(() => {
          setStylesSequentially();
        }, intervalTime);
        setStylesSequentially();
      }

      if (difference > 0 && !trigger) {
        resetText();
      }

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    },
    [
      difference,
      resetText,
      setStylesSequentially,
      trigger,
      children,
      containerWidth,
      intervalTime,
      pauseTime,
      align,
    ]
  );

  // this handles resizing, resizeobserver is used instead of a resize listener
  // because it is able to detect parent size changes
  useEffect(function detectResize() {
    const containerRef = marqueeRef.current;
    if (!containerRef) return;

    let timeout: ReturnType<typeof setTimeout>;

    const myObserver = new ResizeObserver(([entry]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setContainerWidth(entry.contentRect.width);
      }, 100);
    });

    myObserver.observe(containerRef);
    return () => {
      myObserver.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div
      style={{
        zIndex: "0",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        height: `min-content`,
        position: "relative",
        width: `100%`,
        overflow: "hidden",
      }}
      ref={marqueeRef}
    >
      <p
        style={{
          visibility: "hidden",
          margin: "0",
          padding: "0",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </p>
      <p style={textStyle} ref={textRef}>
        {children}
      </p>
    </div>
  );
}
