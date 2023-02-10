import Accordion from "../common/Accordion/Accordion";
import styles from "./AccordionGrid.module.scss";

const AccordionGrid = () => {
  return (
    <div className={styles.Container}>
      <Accordion
        title="Is Wesh integratable to my existing website/ app/ business/ platform ?"
        text="To create an easy-to-use technical and organizational platform, making blockchain accessible to everyone, empowering both personal and professional lives."
      />
      <Accordion
        title="Is Wesh compatible with Blockchain Technologies?"
        text="To create an easy-to-use technical and organizational platform, making blockchain accessible to everyone, empowering both personal and professional lives."
      />
      <Accordion
        title="Is Wesh ready for market?"
        text="To create an easy-to-use technical and organizational platform, making blockchain accessible to everyone, empowering both personal and professional lives."
      />
      <Accordion
        title="Is Wesh too good to be true?"
        text="To create an easy-to-use technical and organizational platform, making blockchain accessible to everyone, empowering both personal and professional lives."
      />
      <Accordion
        title="Why Wesh?"
        text="To create an easy-to-use technical and organizational platform, making blockchain accessible to everyone, empowering both personal and professional lives."
      />
      <Accordion
        title="How long does the integration take?"
        text="To create an easy-to-use technical and organizational platform, making blockchain accessible to everyone, empowering both personal and professional lives."
      />
      <Accordion
        title="What is the Berty Technologies Org ?"
        text="To create an easy-to-use technical and organizational platform, making blockchain accessible to everyone, empowering both personal and professional lives."
      />
      <Accordion
        title="Why a Blockchain less protocol, instead of making on chain?"
        text="To create an easy-to-use technical and organizational platform, making blockchain accessible to everyone, empowering both personal and professional lives."
      />
    </div>
  );
};

export default AccordionGrid;
