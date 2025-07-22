import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./Music.module.css";
import { useEffect, useState } from "react";

const MUSIC_PROJECTS = [
  {
    name: "weird inside",
    link: "weirdinside",
  },
  {
    name: "denis biblioni",
    link: "denisbiblioni",
  },
  {
    name: "RRST",
    link: "rrst",
  },
];

export default function Music() {
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState<string>("music");

  useEffect(() => {
    const pathnames = location.pathname.split("/");
    const last = pathnames.at(-1) ?? "music";
    setCurrentTab(last);
  }, [location]);

  return (
    <div className={styles.page}>
      <Link
        to="/music"
        className={`${styles.title} ${currentTab === "music" && styles.active}`}
      >
        {!(currentTab === "music") && <p className={styles.back}> back to </p>}
        MUSIC
      </Link>
      <p
        className={`${styles.subtitle} ${
          currentTab === "music" && styles.active
        }`}
      >
        below is a list of music projects (aliases) that I have created and
        released music under. I began making music in 2015 as weird inside, in
        2018 as RRST, and in 2023 as denis biblioni. each moniker has its own
        sound, purpose and story, hence I chose to separate them into different
        projects (as opposed to releasing all my music as weird inside).
      </p>
      <nav className={styles.nav}>
        <ol className={styles.nav_list}>
          {MUSIC_PROJECTS.map((item) => {
            return (
              <Link className={styles.nav_item_container} to={item.link}>
                <li
                  className={`${styles.nav_item} ${
                    currentTab !== "music" &&
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
          currentTab !== "music" && styles.active
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}
