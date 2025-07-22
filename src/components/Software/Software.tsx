import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./Software.module.css";
import { useEffect, useState } from "react";

const SOFTWARE_PROJECTS = [
  {
    name: "zackvillere.com",
    link: "zackvillere",
    wip: true,
  },
  {
    name: "weirdinsi.de",
    link: "weirdinside",
    wip: true,
  },
  {
    name: "bender.film",
    link: "benderfilm",
    wip: true,
  },
  {
    name: "rees.club",
    link: "reesclub",
    wip: false,
  },
  {
    name: "denis.works",
    link: "denisworks",
    wip: false,
  },
  {
    name: "react-knob",
    link: "react-knob",
    wip: true,
  },
  {
    name: "react-text-autoscroll",
    link: "react-text-autoscroll",
    wip: true,
  },
  {
    name: "20vt.help",
    link: "20vt",
    wip: false,
  },
];

export default function Software() {
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState<string>("software");

  useEffect(() => {
    const pathnames = location.pathname.split("/");
    const last = pathnames.at(-1) ?? "software";
    setCurrentTab(last);
  }, [location]);

  return (
    <div className={styles.page}>
      <Link
        to="/software"
        className={`${styles.title} ${
          currentTab === "software" && styles.active
        }`}
      >
        {!(currentTab === "software") && (
          <p className={styles.back}> back to </p>
        )}
        SOFTWARE
      </Link>
      <p
        className={`${styles.subtitle} ${
          currentTab === "software" && styles.active
        }`}
      >
        below is a list of software projects I have worked on and am working on.
        the presence of a [*] next to the name of the project indicates that it
        is a work in progress. they are listed in reverse chronological order
        based on the date the project was started.
      </p>
      <nav className={styles.nav}>
        <ol className={styles.nav_list}>
          {SOFTWARE_PROJECTS.map((item) => {
            return (
              <Link className={styles.nav_item_container} to={item.link}>
                <li
                  className={`${styles.nav_item} ${
                    currentTab !== "software" &&
                    currentTab !== item.link &&
                    styles.hidden
                  }`}
                >
                  {item.name}{" "}
                  {item.wip && (
                    <span
                      style={{
                        color: "#f05555",
                      }}
                    >
                      *
                    </span>
                  )}
                </li>
              </Link>
            );
          })}
        </ol>
      </nav>
      <div
        className={`${styles.outlet} ${
          currentTab !== "software" && styles.active
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
}
