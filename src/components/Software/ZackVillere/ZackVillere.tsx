import styles from "./ZackVillere.module.css";

export default function ZackVillere() {
  return (
    <div className={styles.page}>
      <p className={styles.description}>
        <span className={styles.link}>zackvillere.com</span> is a website for
        the artist Zack Villere, specifically created for the release of his
        upcoming album "SNOEY." The website was designed and developed to mimic
        the functionality of the iPod Classic.
        <br /> <br /> ** VISUAL REPRESENTATION UNAVAILABLE DUE TO PROJECT IN
        PROGRESS **
        <br /> <br />I began designing the wireframe after a first generation
        iPod Classic. The main reason for this choice was better UX on a touch
        screen - later generation iPod Classics (including the iPod Video, which
        we chose to land on for the final visual representation) utilized a
        clickable scroll wheel, unifying the buttons and scroll wheel, or giving
        the scroll wheel clickable 'zones.' This wouldn't have worked so well on
        a touch screen, as there is no haptic feedback or even a force touch
        ability to simulate a click. So, behind the scenes...
      </p>
      <br />
      {/* visual representation of the ipod classic */}
      ** VISUAL REPRESENTATION UNAVAILABLE DUE TO PROJECT IN PROGRESS **
      <br />
      <br />
      <p className={styles.description}>
        ...the iPod Classic gen 1 UX is still present despite the UI. By
        clicking on the edges of the scroll wheel where the icons showing the
        actions are, the corresponding action is triggered. When scrolling is
        initiated, the size of the scrollwheel doubles, allowing the user to get
        somewhat sloppy with their scrolling movements and not go outside of the
        bounds to 'cancel' the scrolling.
      </p>
    </div>
  );
}
