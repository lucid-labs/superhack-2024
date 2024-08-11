import React from "react";

type Props = {
  className?: string;
};

const Loader = (props: Props) => {
  const { className } = props;
  return <span className={`loader ${className}`}></span>;
};

export default Loader;
