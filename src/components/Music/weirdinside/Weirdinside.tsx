import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./Weirdinside.module.css";
import { useState, useEffect } from "react";

const WEIRDINSIDE_SINGLES = [
  {
    name: "eureka!",
    link: "eureka",
  },
  {
    name: "game point",
    link: "gamepoint",
  },
  {
    name: "careful! / out there",
    link: "carefuloutthere",
  },
  {
    name: "nobody there!",
    link: "nobodythere",
  },
  {
    name: "the sculptor",
    link: "thesculptor",
  },
  {
    name: "little angels",
    link: "littleangels",
  },
  {
    name: "cycles",
    link: "cycles",
  },
  {
    name: "slow hours",
    link: "slowhours",
  },
  {
    name: "nothing",
    link: "nothing",
  },
  {
    name: "flight & safety",
    link: "fns",
  },
  {
    name: "hopeless",
    link: "hopeless",
  },
  {
    name: "just ask",
    link: "justask",
  },
];

const WEIRDINSIDE_PROJECTS = [
  {
    name: "point in time (LP)",
    link: "pit",
  },
  {
    name: "travel bag (EP)",
    link: "travelbag",
  },

  {
    name: "pulp (EP)",
    link: "pulp",
  },

  {
    name: "as we know (EP)",
    link: "asweknow",
  },
  {
    name: "SINGLES",
    link: "singles",
  },
  {
    name: "REMIXES",
    link: "remixes",
  },
];

export default function Weirdinside() {
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState<string>("weirdinside");

  useEffect(() => {
    const pathnames = location.pathname.split("/");
    const last = pathnames.at(-1) ?? "weirdinside";
    setCurrentTab(last);
  }, [location]);

  return (
    <div className={styles.page}>
      <Link
        to="/music/weirdinside"
        className={`${styles.title} ${
          currentTab === "weirdinside" && styles.active
        }`}
      >
        {!(currentTab === "weirdinside") && (
          <p className={styles.back}> back to </p>
        )}
        WEIRD INSIDE
      </Link>
      <p
        className={`${styles.subtitle} ${
          currentTab === "weirdinside" && styles.active
        }`}
      >
        weird inside is the first music project I began officially releasing
        music under. It started in 2015 as an exploration of the future bass,
        hip hop and EDM genres, though it often all gets classified as 'lofi.'
      </p>
      <nav className={styles.nav}>
        <ol className={styles.nav_list}>
          {WEIRDINSIDE_PROJECTS.map((item) => {
            return (
              <Link className={styles.nav_item_container} to={item.link}>
                <li
                  className={`${styles.nav_item} ${
                    currentTab !== "weirdinside" &&
                    currentTab !== item.link &&
                    styles.hidden
                  }`}
                >
                  {item.name}
                </li>
              </Link>
            );
          })}
        </ol>
      </nav>
      <div
        className={`${styles.outlet} ${
          currentTab !== "weirdinside" && styles.active
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}
