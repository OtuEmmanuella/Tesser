import { Helmet } from "react-helmet-async";
import { Link } from "@/components/Elements";

import style from "./style.module.scss";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Helmet title={"Tesser"}>
        <meta name="description" content={"Manage "} />
      </Helmet>
      <div className={style["layout"]}>
        <header className={style["layout__header"]}>
          <nav className={style["layout__header-inner"]}>
            <Link className={style["layout__header-logo"]} to="/">
              Tesser
            </Link>

            <Link to="/projects">Projects</Link>
          </nav>
        </header>
        <main className={style["layout__main"]}>{children}</main>
      </div>
    </>
  );
};
