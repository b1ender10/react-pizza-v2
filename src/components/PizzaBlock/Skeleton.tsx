import { cp } from 'fs';
import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={560}
    viewBox="0 0 280 560"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    >
    <circle cx="108" cy="139" r="2" />
    <circle cx="140" cy="125" r="125" />
    <rect x="0" y="269" rx="15" ry="15" width="280" height="28" />
    <rect x="0" y="319" rx="15" ry="15" width="280" height="88" />
    <rect x="0" y="428" rx="15" ry="15" width="100" height="27" />
    <rect x="127" y="419" rx="25" ry="25" width="152" height="45" />
    <rect x="203" y="457" rx="0" ry="0" width="1" height="0" />
  </ContentLoader>
);

export default Skeleton;
