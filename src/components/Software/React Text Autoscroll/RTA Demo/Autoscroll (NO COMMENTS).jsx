import { useState, useEffect, useRef, useMemo, useCallback } from "react";

export default function AutoscrollText({
  children,
  trigger = true, 
  scrollSpeed = 1,
  pauseTime = 500, 
  align = "left",
}) {

  const [scrollTime, setScrollTime] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0); 
  const [difference, setDifference] = useState(0);
  const [textStyle, setTextStyle] = useState({}); 

  const marqueeRef = useRef(null);
  const textRef = useRef(null);

  const intervalTime = useMemo(() => {
    return scrollTime + pauseTime * 2;
  }, [scrollTime, pauseTime]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const setStylesSequentially = useCallback(async () => {
    setTextStyle(() => ({
      position: `absolute`,
      textWrap: `nowrap`,
      transition: `none`,
      right: `${-difference}px`,
    }));

    await delay(20); 

    setTextStyle(() => ({
      position: `absolute`,
      textWrap: `nowrap`,
      transition: `${scrollTime}ms linear ${pauseTime}ms`,
      right: "0px",
    }));
  }, [difference, pauseTime, scrollTime]);


  const resetText = useCallback(() => {
    setTextStyle({
      position: `absolute`,
      textWrap: `nowrap`,
      transition: `none`,
      right: `${-difference}px`,
    });
  }, [difference]);

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.offsetWidth;
      const diff = textWidth - containerWidth;
      setScrollTime(diff * 21 * (1 / scrollSpeed));
      setDifference(diff);
    }
  }, [scrollSpeed, children, containerWidth, difference, trigger]);

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


  useEffect(() => {
    let interval;

    if (difference > 0) {
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
