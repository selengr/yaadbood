
import React from "react";
import { Tooltip, TooltipProps, tooltipClasses } from "@mui/material";

interface CustomTooltipProps extends Omit<TooltipProps, "children" | "title"> {
  /** The content displayed inside the tooltip */
  title: React.ReactNode;
  /** The element that triggers the tooltip on hover */
  children: React.ReactNode;
  /** 
   * The placement of the tooltip relative to the trigger element  
   * Options: 'top', 'bottom', 'left', 'right', 'top-start', 'top-end',  
   * 'bottom-start', 'bottom-end', 'left-start', 'left-end', 'right-start', 'right-end'
   */
  placement?: "top" | "bottom" | "left" | "right" |
  "top-start" | "top-end" |
  "bottom-start" | "bottom-end" |
  "left-start" | "left-end" |
  "right-start" | "right-end";
  /** Whether the tooltip should have an arrow pointing to the trigger */
  arrow?: boolean;
  /** Delay (in milliseconds) before the tooltip appears */
  enterDelay?: number;
  /** Delay (in milliseconds) before the tooltip disappears */
  leaveDelay?: number;
  /** Additional styles for the tooltip */
  tooltipStyles?: React.CSSProperties;
  /** Additional styles for the tooltip arrow */
  arrowStyles?: React.CSSProperties;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  children,
  title,
  placement = "bottom",
  arrow = true,
  enterDelay = 200,
  leaveDelay = 100,
  tooltipStyles,
  arrowStyles,
  ...rest
}) => {
  const baseTooltipStyles = {
    borderRadius: "6px",
    backgroundColor: "#64748B",
    outline: "1px solid white",
    padding: "4px 8px",
    width:'auto',
    maxWidth: "none", // ✅ Removes width restriction
    margin: "0px", // ✅ Ensures no extra margin on any side
    ...tooltipStyles,
  };

  const baseArrowStyles = {
    color: "#64748B", // Sets the arrow color to match the tooltip
    "&::before": {
      content: "\"\"",
      display: "block",
      width: "100%",
      borderRadius: "2px",
      height: "100%",
      backgroundColor: "#64748B",
      outline: "1px solid white",
    },
    ...arrowStyles,
  };

  return (
    <Tooltip
      title={title}
      arrow={arrow}
      placement={placement}
      enterDelay={enterDelay}
      leaveDelay={leaveDelay}
      slotProps={{
        popper: {
          sx: {
            [`& .${tooltipClasses.tooltip}`]: baseTooltipStyles,
            [`& .${tooltipClasses.arrow}`]: baseArrowStyles,
            [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]: {
              marginTop: "8px",
            },
            [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]: {
              marginBottom: "8px",
            },
            [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]: {
              marginLeft: "8px",
            },
            [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]: {
              marginRight: "8px",
            },
          },
        },
      }}
      {...rest}
    >
      <span style={{ display: "inline-block" , cursor:'pointer'}}>{children}</span>
    </Tooltip>
  );
};

export default CustomTooltip;
