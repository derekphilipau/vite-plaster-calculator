export const SphereShape = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 144 144"
  >
    <circle cx="71.898" cy="72" r="66" />
    <path
      d="M137.898,72.235c0,18.213 -29.573,33 -66,33c-36.426,-0 -66,-14.787 -66,-33"
      style={{
        strokeDasharray: "3,8,0,0,0,0",
      }}
    />
    <path
      d="M137.898,71.765c0,-18.213 -29.573,-33 -66,-33c-36.426,0 -66,14.787 -66,33"
      style={{
        strokeDasharray: "3,8,0,0,0,0",
      }}
    />
    <path
      d="M72,71.765l66,0"
      style={{
        strokeDasharray: "3,8,0,0,0,0",
      }}
    />
    <path
      d="M98.417,81.833c0.444,-0.944 1.076,-1.777 1.895,-2.5c0.82,-0.722 1.688,-1.277 2.605,-1.666c0.916,-0.389 1.722,-0.598 2.416,-0.625l-0.166,3.875c-1.25,-0.056 -2.382,0.194 -3.396,0.75c-1.014,0.555 -1.806,1.326 -2.375,2.312c-0.57,0.986 -0.854,2.035 -0.854,3.146l-0,7.875l-3.875,0l-0,-17.25l3.458,0l0.292,4.083Z"
      style={{
        fill: "currentColor",
        strokeWidth: 0,
      }}
    />
    <circle
      cx="72"
      cy="71.765"
      r="5"
      style={{
        fill: "currentColor",
      }}
    />
  </svg>
);
