import clsx from "clsx";
import {
  Link as RouterLink,
  LinkProps,
  useResolvedPath,
  useMatch,
} from "react-router-dom";
import style from "./style.module.scss";

export const Link = ({
  className: linkClassName,
  children,
  ...props
}: LinkProps) => {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  const styleClassName = clsx({
    [style["link"]]: true,
    [style["link__active"]]: Boolean(match),
    linkClassName,
  });

  return (
    <RouterLink className={styleClassName} {...props}>
      {children}
    </RouterLink>
  );
};
