import styles from "./Navbar.module.scss";
import Link from "next/link";
import Button from "../common/Button/Button";
import { useState } from "react";
import Footer from "../Footer/Footer";

const Navbar = () => {
  const [open, SetOpen] = useState(false);

  const handleOpen = () => {
    if (open) {
      SetOpen(false);
      console.log(true);
    } else {
      SetOpen(true);
    }
  };
  return (
    <nav className={styles.NavbarContainer}>
      <div className={styles.Navbar}>
        <Link href="/">
          <img src="/img/NavBarLogo.png" alt="" />
        </Link>

        <div className={styles.Links}>
          <Link href="/vision">Vision</Link>
          <Link href="/blog">Blog</Link>
        </div>

        <div className={styles.Burger}>
          <Button
            image="/img/Burger.png"
            style="Navbar"
            onclick={handleOpen}
          />
        </div>
      </div>
      <div className={open ? styles.OpenBurger : styles.close}>
        <div className={styles.BurgerClose}>
          <img className={styles.logo} src="/img/NavBarLogo.png" alt="" />
          <Button image="/img/Cross.png" style="Navbar" onclick={handleOpen} />
        </div>

        <div className={styles.LinksMobile}>
          <Link href="/vision">Vision</Link>
          <Link href="/blog">Blog</Link>
        </div>

        <div className={styles.credits}>
          <p>Copyright © 2023 – Berty.Tech non-profit organization</p>
          <div>
            <img src="/img/Discord.png" alt="" />
            <img src="/img/Git.png" alt="" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
