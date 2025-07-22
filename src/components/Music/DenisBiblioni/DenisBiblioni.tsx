import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./DenisBiblioni.module.css";
import { useState, useEffect } from "react";

const DENIS_PROJECTS = [
  {
    name: "DENIS EP",
    link: "denis-ep",
  },
  {
    name: "the usual*",
    link: "the-usual",
  },
];

export default function DenisBiblioni() {
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState<string>("denisbiblioni");

  useEffect(() => {
    const pathnames = location.pathname.split("/");
    const last = pathnames.at(-1) ?? "denisbiblioni";
    setCurrentTab(last);
  }, [location]);

  return (
    <div className={styles.page}>
      <Link
        to="/music/denisbiblioni"
        className={`${styles.title} ${
          currentTab === "denisbiblioni" && styles.active
        }`}
      >
        {!(currentTab === "denisbiblioni") && (
          <p className={styles.back}> back to </p>
        )}
        DENIS BIBLIONI
      </Link>
      <p
        className={`${styles.subtitle} ${
          currentTab === "denisbiblioni" && styles.active
        }`}
      >
        Denis Biblioni is a character / alias that I began releasing music under
        in April 2023. The character is a mechanic that lives in the
        countryside, and makes music using an 8 track tape machine. The purpose
        of this project was to simplify my creative process greatly and limit
        myself to using hardware tools with minimal software interference to
        create songs, and simultaneously explore storytelling through lyrics.
      </p>
      <nav className={styles.nav}>
        <ol className={styles.nav_list}>
          {DENIS_PROJECTS.map((item) => {
            return (
              <Link className={styles.nav_item_container} to={item.link}>
                <li
                  className={`${styles.nav_item} ${
                    currentTab !== "denisbiblioni" &&
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
          currentTab !== "denisbiblioni" && styles.active
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}
