import Link, { LinkProps } from "next/link";
import React, { Children } from "react";

import { useRouter } from "next/router";

const NavLink = ({ children, exact = false, ...props }) => {
  const { asPath, pathname, route, query, basePath } = useRouter();
  const child = Children.only(children);
  const childClassName = child.props.className || "";

  const isActive = exact
    ? (props.as || props.href.pathname || props.href) === asPath
    : asPath.startsWith(props.as || props.href.pathname || props.href);

  return (
    <Link
      href={props.href}
      shallow
      {...props}
      style={{ textDecoration: "none", alignSelf: "center" }}
    >
      {" "}
      {React.cloneElement(child, {})}
    </Link>
  );
};

export default NavLink;
