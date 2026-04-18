import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const Switch = React.forwardRef(
  (
    {
      className,
      onCheckedChange,
      checked,
      defaultChecked,
      size = "md",
      thumbColor,
      trackColor,
      ...props
    },
    ref
  ) => {
    const [isChecked, setIsChecked] = React.useState(
      checked !== undefined ? checked : defaultChecked || false
    );

    React.useEffect(() => {
      if (checked !== undefined) {
        setIsChecked(checked);
      }
    }, [checked]);

    const sizeClasses = {
      sm: {
        track: "h-5 w-9",
        thumb: "h-4 w-4",
        distance: 16, // px translation
      },
      md: {
        track: "h-6 w-11",
        thumb: "h-5 w-5",
        distance: 20,
      },
      lg: {
        track: "h-8 w-14",
        thumb: "h-7 w-7",
        distance: 24,
      },
    };

    const handleChange = (event) => {
      const newChecked = event.target.checked;
      if (checked === undefined) {
        setIsChecked(newChecked);
      }
      onCheckedChange?.(newChecked);
    };

    const handleClick = () => {
      if (!props.disabled) {
        const newChecked = !isChecked;
        if (checked === undefined) {
          setIsChecked(newChecked);
        }
        onCheckedChange?.(newChecked);
      }
    };

    const customTrackStyle = trackColor
      ? { backgroundColor: isChecked ? trackColor : undefined }
      : {};

    const customThumbStyle = thumbColor ? { backgroundColor: thumbColor } : {};

    // Calculate translation based on direction
    const isRTL = document.dir === "rtl";
    const xMove = isChecked ? (isRTL ? -sizeClasses[size].distance : sizeClasses[size].distance) : 0;

    return (
      <div
        className={cn(
          "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50",
          isChecked ? "bg-navy" : "bg-gray-200",
          sizeClasses[size].track,
          className
        )}
        style={customTrackStyle}
        onClick={handleClick}
        role="switch"
        aria-checked={isChecked}
      >
        <input
          type="checkbox"
          className="absolute h-0 w-0 opacity-0"
          ref={ref}
          checked={isChecked}
          onChange={handleChange}
          aria-hidden="true"
          {...props}
        />
        <motion.span
          className={cn(
            "pointer-events-none block rounded-full bg-white shadow-lg ring-0",
            sizeClasses[size].thumb
          )}
          animate={{ x: xMove }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          style={customThumbStyle}
        />
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
