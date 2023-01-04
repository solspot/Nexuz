/* eslint-disable react/prop-types */
import * as React from 'react';

const HomeBottomWave = (props) => (
  <svg width={5091} height={'inherit'} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M-61 72.503c306.616 3.596 339 242.169 503 120.1 164-122.07 404-232 636-120.1s556 292.4 1100 120.1c266.09-84.277 430.73 60.071 564.15 178.998l395.85.001c296-431.999 556 30.001 932-178.999s348 128 616 28c268-100.001 368 150.998 368 150.998H3870l-732 .001c-151.22 220.695-256.5 124.212-395.85-.001H-81l20-299.098Z"
      fill={props.fill}
    />
    <path
      d="M-61 72.503c306.616 3.596 339 242.169 503 120.1 164-122.07 404-232 636-120.1s556 292.4 1100 120.1c544-172.3 664 610.998 960 178.999s556 30.001 932-178.999 348 128 616 28c268-100.001 368 150.998 368 150.998H-81l20-299.098Z"
      stroke={props.stroke}
      strokeWidth={50}
    />
  </svg>
);

export default HomeBottomWave;