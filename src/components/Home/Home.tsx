import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./Home.module.css";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  {
    title: "software",
    link: "software",
  },
  {
    title: "music",
    link: "music",
  },
  {
    title: "animation",
    link: "animation",
  },
  {
    title: "contact",
    link: "contact",
  },
];

export default function Home() {
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState<string>("");

  useEffect(() => {
    const pathnames = location.pathname.split("/");
    const last = pathnames.at(-1) ?? "";
    setCurrentTab(last);
  }, [location]);
  return (
    <div className={styles.home}>
      <Link
        to="/"
        className={`${styles.back} ${currentTab !== "" && styles.active}`}
      >
        <p className={styles.back_sub}> back to </p>
        HOME
      </Link>
      <section
        className={`${styles.main} ${currentTab === "" && styles.active}`}
      >
        <div className={styles.description}>
          ani bharadwaj (b. 1998) is a builder (of{" "}
          <Link style={{ color: "orange" }} to="software">
            software
          </Link>
          ,{" "}
          <Link style={{ color: "green" }} to="music">
            music
          </Link>
          , <span>visual goods</span>, and <span>cars</span>) living in New
          Jersey. When he is not building something, he is driving his car long
          distances, fixing something with duct tape, riding his bike in the
          woods, and definitely not writing about himself in the third person.
        </div>
        <nav className={styles.nav}>
          <ul className={styles.nav_list}>
            {NAV_ITEMS.map((item, idx) => {
              return (
                <NavLink key={idx} to={item.link} className={styles.nav_item}>
                  {item.title.toUpperCase()}
                </NavLink>
              );
            })}
          </ul>
        </nav>
      </section>
      <div className={`${styles.outlet} ${currentTab !== "" && styles.active}`}>
        <Outlet />
      </div>
    </div>
  );
}
