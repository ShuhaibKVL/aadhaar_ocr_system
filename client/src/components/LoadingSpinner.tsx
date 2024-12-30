const LoadingSpinner = ({ className = "w-12 h-12" }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        className={className}
        style={{ background: 'transparent' }}
      >
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((rotation, index) => (
          <g key={rotation} transform={`rotate(${rotation} 50 50)`}>
            <rect
              x="47"
              y="24"
              rx="3"
              ry="6"
              width="6"
              height="12"
              fill="#fe718d"
            >
              <animate
                attributeName="opacity"
                values="1;0"
                keyTimes="0;1"
                dur="1s"
                begin={`${-0.9166666666666666 + (index * 0.0833333333333333)}s`}
                repeatCount="indefinite"
              />
            </rect>
          </g>
        ))}
      </svg>
    );
  };

export default LoadingSpinner