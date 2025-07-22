import { useState, useEffect, useRef, useMemo, useCallback } from "react";

export default function AutoscrollText({
  children,
  trigger = true, // this is a value that changes to trigger the effect
  scrollSpeed = 1, // number greater than 0
  pauseTime = 500, // pause time before and after the marquee runs
  align = "left", // alignment of the text if the text doesn't exceed the parent width
}) {
  // on page load, set style and transition: right 0px and transition to true
  // when the children change, recalculate and retrigger.

  // ------------------------------------ //
  //                STATES                //
  // ------------------------------------ //

  const [scrollTime, setScrollTime] = useState(0); // stores scrollTime variable after calculation in checkWindowSize hook
  const [containerWidth, setContainerWidth] = useState(0); // again, arbitrary number but tracks container width
  const [difference, setDifference] = useState(0); // the int value of the pixel value to move the text
  const [textStyle, setTextStyle] = useState({}); // stores the states to be animated between. set on an interval

  // ------------------------------------ //
  //                  REFS                //
  // ------------------------------------ //

  const marqueeRef = useRef(null);
  const textRef = useRef(null);

  const intervalTime = useMemo(() => {
    return scrollTime + pauseTime * 2;
  }, [scrollTime, pauseTime]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const setStylesSequentially = useCallback(async () => {
    // setInitialStyle does the same thing that this does, just this does it unconditionally if textwidth > containerwidth
    setTextStyle(() => ({
      position: `absolute`,
      textWrap: `nowrap`,
      transition: `none`,
      right: `${-difference}px`,
    }));

    await delay(20); // a glitch occurs if this delay is too short, and as a result does not reset the styles properly

    // sets text style to ending position, which relies on <scrollTime> (calculated in checkWindowSize) and pauseTime, but does not require <difference>
    setTextStyle(() => ({
      position: `absolute`,
      textWrap: `nowrap`,
      transition: `${scrollTime}ms linear ${pauseTime}ms`,
      right: "0px",
    }));
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
  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.offsetWidth;
      const diff = textWidth - containerWidth;
      setScrollTime(diff * 21 * (1 / scrollSpeed));
      setDifference(diff);
    }
  }, [scrollSpeed, children, containerWidth, difference, trigger]);

  // set the initial style before rendering the rest
  useEffect(() => {
    function getAlignmentStyle() {
      const baseStyle = {
        position: "absolute",
        textWrap: "nowrap",
        transition: "none",
      };

      if (difference > 0) {
        return { ...baseStyle, right: `${-difference}px` };
      }

      switch (align) {
        case "left":
          return { ...baseStyle, left: "0px" };
        case "right":
          return { ...baseStyle, right: "0px" };
        case "center":
          return {
            ...baseStyle,
            left: "0",
            right: "0",
            marginInline: "auto",
            width: "fit-content",
          };
        default:
          return baseStyle;
      }
    }

    setTextStyle(getAlignmentStyle);
  }, [scrollTime, pauseTime, align, difference]);

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

  useEffect(() => {
    let interval;

    if (difference > 0) {
      // this conditional needs to only occur if trigger is passed through - else, this is just defaulted true
      if (trigger) {
        interval = setInterval(() => {
          setStylesSequentially();
        }, intervalTime);
        setStylesSequentially();
      } else {
        clearInterval(interval);
        resetText();
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    difference,
    resetText,
    setStylesSequentially,
    trigger,
    children,
    containerWidth,
    intervalTime,
    pauseTime,
    align,
  ]);

  // this handles resizing, resizeobserver is used instead of a resize listener
  // because it is able to detect parent size changes

  useEffect(() => {
    const containerRef = marqueeRef.current;
    if (!containerRef) return;

    const myObserver = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });

    myObserver.observe(containerRef);

    return () => {
      myObserver.disconnect();
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
          opacity: "0",
          margin: "0",
          padding: "0",
          whiteSpace: "nowrap",
        }}
      >
        {"x"}
      </p>
      <p style={textStyle} ref={textRef}>
        {children}
      </p>
    </div>
  );
}
