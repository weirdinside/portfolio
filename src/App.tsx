import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import styles from "./App.module.css";
import Home from "./components/Home/Home";
import wilogo from "/wilogo.webp";
import Software from "./components/Software/Software";
import ZackVillere from "./components/Software/ZackVillere/ZackVillere";
import ReesClub from "./components/Software/rees.club/ReesClub";
import BenderFilm from "./components/Software/BenderFilm/BenderFilm";
import ReactTextAutoScroll from "./components/Software/React Text Autoscroll/ReactTextAutoscroll";
import ReactKnob from "./components/Software/React Knob/ReactKnob";
import DenisWorks from "./components/Software/DenisWorks/DenisWorks";
import { useEffect } from "react";
import Music from "./components/Music/Music";
import DenisEP from "./components/Music/DenisBiblioni/DenisEP/DenisEP";
import DenisBiblioni from "./components/Music/DenisBiblioni/DenisBiblioni";
import Weirdinside from "./components/Music/weirdinside/Weirdinside";
import WeirdinsideSite from "./components/Software/WeirdinsideSite/WeirdinsideSite";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    function escHandler(e: KeyboardEvent) {
      if (e.key === "Escape") {
        const previousPath = location.pathname.split("/").slice(-1).join("/");
        navigate(previousPath);
      }
    }

    window.addEventListener("keyup", escHandler);
    return () => {
      window.removeEventListener("keyup", escHandler);
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.page_content}>
        <header className={styles.header}>
          <div className={styles.textcontainer}>
            <p className={styles.infotext}>_portfolio: anirudh bharadwaj</p>
            <p className={styles.infotext}>_lastupdated: 071825:1800EST</p>
          </div>
          <Link
            to="/"
            className={styles.logo}
            style={{ backgroundImage: `url(${wilogo})` }}
          />
        </header>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="software" element={<Software />}>
              <Route path="reesclub" element={<ReesClub />} />
              <Route path="weirdinside" element={<WeirdinsideSite />} />
              <Route path="react-knob" element={<ReactKnob />} />
              <Route
                path="react-text-autoscroll"
                element={<ReactTextAutoScroll />}
              />
              <Route path="20vt" element={<></>} />
              <Route path="denisworks" element={<DenisWorks />} />
              <Route path="zackvillere" element={<ZackVillere />} />
              <Route path="benderfilm" element={<BenderFilm />} />
            </Route>
            <Route path="music" element={<Music />}>
              <Route path="weirdinside" element={<Weirdinside />}></Route>
              <Route path="rrst" element={<></>}>
                <Route path="cruise-control" />
                <Route path="cold-start" />
                <Route path="cross-country" />
              </Route>
              <Route path="denisbiblioni" element={<DenisBiblioni />}>
                <Route path="denis-ep" element={<DenisEP />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}
