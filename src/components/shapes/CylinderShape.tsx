export const CylinderShape = ({
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
        <ellipse cx="72.025" cy="39" rx="66" ry="33" />
        <path d="M136.019,119c1.277,2.562 1.956,5.242 1.956,8c-0,18.213 -29.574,33 -66,33c-36.427,0 -66,-14.787 -66,-33c-0,-2.527 0.569,-4.989 1.647,-7.354" />
        <path
          d="M137.975,127c-0,-18.213 -29.574,-33 -66,-33c-36.427,0 -66,14.787 -66,33"
          style={{
            strokeDasharray: "3,8,0,0,0,0",
          }}
        />
        <path
          d="M72.025,127l66,0"
          style={{
            strokeDasharray: "3,8,0,0,0,0",
          }}
        />
        <circle
          cx="72.025"
          cy="127"
          r="5"
          style={{
            fill: "currentColor",
            strokeWidth: 0,
          }}
        />
        <path d="M6.025,39l0,88" />
        <path d="M138.025,39l0,88" />
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
      <ellipse cx="72.025" cy="39" rx="66" ry="33" />
      <path d="M136.019,119c1.277,2.562 1.956,5.242 1.956,8c-0,18.213 -29.574,33 -66,33c-36.427,0 -66,-14.787 -66,-33c-0,-2.527 0.569,-4.989 1.647,-7.354" />
      <path
        d="M137.975,127c-0,-18.213 -29.574,-33 -66,-33c-36.427,0 -66,14.787 -66,33"
        style={{
          strokeDasharray: "3,8,0,0,0,0",
        }}
      />
      <path
        d="M72.025,127l66,0"
        style={{
          strokeDasharray: "3,8,0,0,0,0",
        }}
      />
      <path
        d="M96.417,136.833c0.444,-0.944 1.076,-1.777 1.895,-2.5c0.82,-0.722 1.688,-1.277 2.605,-1.666c0.916,-0.389 1.722,-0.598 2.416,-0.625l-0.166,3.875c-1.25,-0.056 -2.382,0.194 -3.396,0.75c-1.014,0.555 -1.806,1.326 -2.375,2.312c-0.57,0.986 -0.854,2.035 -0.854,3.146l-0,7.875l-3.875,0l-0,-17.25l3.458,0l0.292,4.083Z"
        style={{
          fill: "currentColor",
          strokeWidth: 0,
        }}
      />
      <circle
        cx="72.025"
        cy="127"
        r="5"
        style={{
          fill: "currentColor",
          strokeWidth: 0,
        }}
      />
      <path
        d="M20.442,80.875c1.45,0 2.65,0.431 3.6,1.294c0.95,0.862 1.437,1.981 1.462,3.356l0,11.475l-3.525,0l0,-10.275c-0.05,-0.875 -0.312,-1.562 -0.787,-2.062c-0.475,-0.5 -1.188,-0.763 -2.138,-0.788c-0.9,0 -1.712,0.25 -2.437,0.75c-0.725,0.5 -1.294,1.2 -1.707,2.1c-0.412,0.9 -0.618,1.9 -0.618,3l-0,7.275l-3.488,0l0,-29.062l3.413,-0l-0,16.35c0.575,-1.025 1.406,-1.85 2.493,-2.475c1.088,-0.625 2.332,-0.938 3.732,-0.938Z"
        style={{
          fill: "currentColor",
          strokeWidth: 0,
        }}
      />
      <path d="M6.025,39l0,88" />
      <path d="M138.025,39l0,88" />
    </svg>
  );
};
