import { useState, useEffect, useRef, useMemo, useCallback } from "react";

interface AutoscrollTextProps {
  trigger?: boolean | number | string;
  scrollSpeed?: number;
  pauseTime?: number;
  children: string;
  align?: "left" | "right" | "center"; 
}

export default function AutoscrollText({
  children,
  trigger = true,
  scrollSpeed = 1,
  pauseTime = 500,
  align = "left",
}: AutoscrollTextProps) {

  const [scrollTime, setScrollTime] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0); 
  const [difference, setDifference] = useState<number>(0); 
  const [textStyle, setTextStyle] = useState<React.CSSProperties>({}); 

  const marqueeRef = useRef<HTMLDivElement>(null); 
  const textRef = useRef<HTMLParagraphElement>(null);

  const intervalTime = useMemo(() => {
    return scrollTime + pauseTime * 2;
  }, [scrollTime, pauseTime]);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

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
  }, [setTextStyle, difference, pauseTime, scrollTime]);

  const resetText = useCallback(() => {
    setTextStyle({
      position: `absolute`,
      textWrap: `nowrap`,
      transition: `none`,
      right: `${-difference}px`,
    });
  }, [setTextStyle, difference]);

  useEffect(
    function checkWindowSize() {
      if (textRef.current) {
        const textWidth = textRef.current.offsetWidth;
        const diff = textWidth - containerWidth; 
        setScrollTime(diff * 21 * (1 / scrollSpeed));
        setDifference(diff);
      }
    },
    [scrollSpeed, children, containerWidth, difference, trigger]
  );

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

 
  useEffect(
    function loopSet() {
      let interval: ReturnType<typeof setInterval> | undefined;
      if (difference > 0) {
        if (trigger) {
          interval = setInterval(() => {
            setStylesSequentially();
          }, intervalTime);
          setStylesSequentially();
        }
        if (!trigger) {
          clearInterval(interval);
          resetText();
        }
      }
      return () => {
        clearInterval(interval);
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

  useEffect(function detectResize() {
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
