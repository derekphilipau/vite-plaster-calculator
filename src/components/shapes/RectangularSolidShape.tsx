export const RectangularSolidShape = ({
  className,
  isIcon = false,
}: {
  className?: string;
  isIcon?: boolean;
}) => {
  if (isIcon) {
    return (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 144 166"
      >
        <path
          d="M51.32,6l-0,121l86.68,0"
          style={{
            strokeDasharray: "3,8,0,0,0,0",
          }}
        />
        <path d="M6,39l86.68,0l0,121l-86.68,0l0,-121" />
        <path d="M51.32,6l86.68,0l0,121" />
        <path d="M51.32,6l-45.32,33" />
        <path d="M92.68,39l45.32,-33" />
        <path d="M138,127l-45.32,33" />
        <path
          d="M51.32,127l-45.32,33"
          style={{
            strokeDasharray: "3,8,0,0,0,0",
          }}
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 144 166"
    >
      <path
        d="M51.32,6l-0,121l86.68,0"
        style={{
          strokeDasharray: "3,8,0,0,0,0",
        }}
      />
      <rect
        x="53.45"
        y="131.167"
        width="3.1"
        height="25.833"
        style={{
          fill: "currentColor",
          strokeWidth: 0,
        }}
      />
      <path
        d="M19.5,94.667c1.289,-0 2.356,0.383 3.2,1.15c0.844,0.766 1.278,1.761 1.3,2.983l0,10.2l-3.133,-0l-0,-9.133c-0.045,-0.778 -0.278,-1.389 -0.7,-1.834c-0.423,-0.444 -1.056,-0.677 -1.9,-0.7c-0.8,0 -1.523,0.223 -2.167,0.667c-0.644,0.444 -1.15,1.067 -1.517,1.867c-0.366,0.8 -0.55,1.689 -0.55,2.666l0,6.467l-3.1,-0l0,-25.833l3.034,-0l-0,14.533c0.511,-0.911 1.25,-1.644 2.216,-2.2c0.967,-0.556 2.073,-0.833 3.317,-0.833Z"
        style={{
          fill: "currentColor",
          strokeWidth: 0,
        }}
      />
      <path
        d="M138,147.2l-6.367,14.633l-4.433,-9.466l-4.033,9.466l-6.4,-14.633l3.066,-0l3.7,8.367l2.567,-6l-1.1,-2.367l2.7,-0l3.733,8.567l3.5,-8.567l3.067,-0Z"
        style={{
          fill: "currentColor",
          strokeWidth: 0,
        }}
      />
      <path d="M6,39l86.68,0l0,121l-86.68,0l0,-121" />
      <path d="M51.32,6l86.68,0l0,121" />
      <path d="M51.32,6l-45.32,33" />
      <path d="M92.68,39l45.32,-33" />
      <path d="M138,127l-45.32,33" />
      <path
        d="M51.32,127l-45.32,33"
        style={{
          strokeDasharray: "3,8,0,0,0,0",
        }}
      />
    </svg>
  );
};
