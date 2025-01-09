import { Link } from "@/components/Elements";

import style from "./style.module.scss";

export const Landing = () => {
  return (
    <div className={style["home"]}>
      <div className={style["home__hero"]}>
        <h2 className={style["home__hero-text"]}>
          Manage projects seamlessly <br /> and at no cost
        </h2>

        <div className={style["home__hero-link"]}>
          <Link to="/projects">Get Started</Link>
        </div>
      </div>
    </div>
  );
};
