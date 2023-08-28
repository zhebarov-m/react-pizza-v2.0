import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton: React.FC = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="136" cy="129" r="125" />
    <rect x="2" y="266" rx="5" ry="5" width="280" height="27" />
    <rect x="1" y="308" rx="5" ry="5" width="280" height="88" />
    <rect x="6" y="421" rx="5" ry="5" width="90" height="27" />
    <rect x="124" y="413" rx="5" ry="5" width="152" height="45" />
  </ContentLoader>
);

export default Skeleton;
