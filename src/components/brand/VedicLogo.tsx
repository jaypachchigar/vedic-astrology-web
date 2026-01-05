"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface VedicLogoProps extends React.SVGAttributes<SVGElement> {
  size?: "sm" | "md" | "lg" | "xl";
  animated?: boolean;
  showText?: boolean;
}

const sizeMap = {
  sm: 24,
  md: 32,
  lg: 48,
  xl: 64,
};

export function VedicLogo({
  size = "md",
  animated = false,
  showText = false,
  className,
  ...props
}: VedicLogoProps) {
  const dimension = sizeMap[size];

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <svg
        width={dimension}
        height={dimension}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(animated && "animate-spin-slow")}
        {...props}
      >
        {/* Outer cosmic ring */}
        <circle
          cx="50"
          cy="50"
          r="48"
          stroke="url(#gradient1)"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />

        {/* Constellation dots */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
          const rad = (angle * Math.PI) / 180;
          const x = 50 + 42 * Math.cos(rad);
          const y = 50 + 42 * Math.sin(rad);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="1.5"
              fill="url(#gradient1)"
              opacity="0.6"
            />
          );
        })}

        {/* Middle lotus petals (8 petals) */}
        <g opacity="0.5">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = 50 + 28 * Math.cos(rad);
            const y = 50 + 28 * Math.sin(rad);
            return (
              <ellipse
                key={i}
                cx={x}
                cy={y}
                rx="8"
                ry="15"
                fill="url(#gradient2)"
                transform={`rotate(${angle} ${x} ${y})`}
              />
            );
          })}
        </g>

        {/* Sri Yantra - Simplified interlocking triangles */}
        <g>
          {/* Downward triangles (Shakti - feminine) */}
          <polygon
            points="50,25 35,55 65,55"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="1.5"
          />
          <polygon
            points="50,30 40,50 60,50"
            fill="none"
            stroke="url(#gradient2)"
            strokeWidth="1.5"
          />

          {/* Upward triangles (Shiva - masculine) */}
          <polygon
            points="50,70 35,45 65,45"
            fill="none"
            stroke="url(#gradient2)"
            strokeWidth="1.5"
            transform="rotate(180 50 50)"
          />
          <polygon
            points="50,65 40,50 60,50"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="1.5"
            transform="rotate(180 50 50)"
          />
        </g>

        {/* Center bindu (point) */}
        <circle
          cx="50"
          cy="50"
          r="4"
          fill="url(#gradient1)"
          className={cn(animated && "animate-pulse")}
        />
        <circle
          cx="50"
          cy="50"
          r="2"
          fill="#FFFFFF"
          opacity="0.8"
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(27, 87%, 55%)" />
            <stop offset="100%" stopColor="hsl(45, 93%, 58%)" />
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(45, 93%, 58%)" />
            <stop offset="50%" stopColor="hsl(27, 87%, 55%)" />
            <stop offset="100%" stopColor="hsl(270, 60%, 70%)" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <span className="font-bold text-lg bg-gradient-to-r from-primary to-gold bg-clip-text text-transparent">
          Vedic Astrology
        </span>
      )}
    </div>
  );
}
