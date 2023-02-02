import { useState } from "react";
import Button from "../Button/Button";
import styles from "./Accordion.module.scss";

export interface AccordionProps {
  title: string;
  text: string;
}

const Accordion = ({ title, text }: AccordionProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.Opener}>
        <h3>{title}</h3>
        <button onClick={handleOpen} className={styles.Button}>
          <img src={open ? "./img/-.png" : "./img/+.png"} alt="" />
        </button>
      </div>
      <div className={open ? styles.slide : styles.none}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Accordion;
