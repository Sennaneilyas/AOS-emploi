import React, { useId, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

/**
 * A sophisticated grid pattern background for the cards.
 */
export function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  squareClassName,
  ...props
}) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y], index) => (
            <rect
              strokeWidth="0"
              key={index}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
              className={squareClassName}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

function genRandomPattern(length = 5) {
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7, // random x between 7 and 10
    Math.floor(Math.random() * 6) + 1, // random y between 1 and 6
  ]);
}

/**
 * A highly interactive feature card with a subtle grid background and elegant typography.
 */
export function FeatureCard({ feature, className, to, ...props }) {
  // Memoize the pattern so it doesn't change on every small re-render
  const pattern = React.useMemo(() => genRandomPattern(), []);
  const [hoveredSquare, setHoveredSquare] = useState(null);
  const Icon = feature.icon;

  const CardWrapper = to ? Link : "div";
  const wrapperProps = to ? { to, ...props } : props;

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Grid alignment (based on GridPattern width/height = 20)
    // Adjust for the offset x="-12" y="4"
    const gridX = Math.floor((x + 12) / 20);
    const gridY = Math.floor((y - 4) / 20);
    
    setHoveredSquare([gridX, gridY]);
  }, []);

  return (
    <CardWrapper
      className={cn(
        "group relative overflow-hidden bg-white p-6 transition-all duration-300 hover:bg-gray-50/50 block",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredSquare(null)}
      {...wrapperProps}
    >
      {/* Background Grid Pattern */}
      <div className="pointer-events-none absolute top-0 start-1/2 -mt-2 -ms-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-gradient-to-r from-navy/5 to-navy/0 opacity-40 transition-opacity duration-300 group-hover:opacity-100 [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={hoveredSquare ? [...pattern, hoveredSquare] : pattern}
            className="absolute inset-0 h-full w-full fill-navy/[0.05] stroke-navy/10 mix-blend-overlay"
            squareClassName="transition-colors duration-300 group-hover:fill-navy group-hover:fill-opacity-20"
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-navy/5 text-navy transition-colors duration-300 group-hover:bg-navy group-hover:text-white">
           <Icon className="size-5" strokeWidth={1.5} aria-hidden />
        </div>
        
        <h3 className="mt-8 text-base font-bold text-navy md:text-lg">
          {feature.title}
        </h3>
        
        <p className="mt-3 text-sm font-light leading-relaxed text-gray-500">
          {feature.description}
        </p>

        {feature.linkText && (
          <div className="mt-auto pt-6">
            <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-navy opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
              {feature.linkText}
              <svg className="ms-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </CardWrapper>
  );
}
