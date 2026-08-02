import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right" | "up" | "down";
  fade?: boolean;
  fadeAmount?: number;
}

export function Marquee({
  children,
  className,
  duration = 20,
  pauseOnHover = false,
  direction = "left",
  fade = true,
  fadeAmount = 10,
  ...props
}: MarqueeProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  const items = React.Children.toArray(children);
  const isVertical = direction === "up" || direction === "down";

  const animationName = isVertical
    ? direction === "up"
      ? "scroll-y"
      : "scroll-y-reverse"
    : direction === "left"
    ? "scroll"
    : "scroll-reverse";

  return (
    <>
      <style>
        {`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scroll-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        @keyframes scroll-y {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        @keyframes scroll-y-reverse {
          0% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}
      </style>
      <div
        ref={containerRef}
        className={cn(
          "flex w-full overflow-hidden select-none",
          isVertical && "flex-col",
          className
        )}
        style={{
          ...(fade && {
            maskImage: isVertical
              ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${
                100 - fadeAmount
              }%, transparent 100%)`
              : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${
                100 - fadeAmount
              }%, transparent 100%)`,
            WebkitMaskImage: isVertical
              ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${
                100 - fadeAmount
              }%, transparent 100%)`
              : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${
                100 - fadeAmount
              }%, transparent 100%)`,
          }),
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        {...props}
      >
        <div
          className={cn(
            "flex shrink-0 w-max",
            isVertical && "flex-col h-max w-full"
          )}
          style={{
            animationName,
            animationDuration: `${duration}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {items.map((item, index) => (
            <div
              key={`first-${index}`}
              className={cn("flex shrink-0", isVertical && "w-full")}
            >
              {item}
            </div>
          ))}
          {items.map((item, index) => (
            <div
              key={`second-${index}`}
              className={cn("flex shrink-0", isVertical && "w-full")}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
