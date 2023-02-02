import Button from "../Button/Button";
import styles from "./Card.module.scss";

export interface CardProps {
  title: string;
  text: string;
  image: string;
}

const Card = ({ title, text, image }: CardProps) => {
  return (
    <div className={styles.CardContainer}>
      <div className={styles.CardText}>
        <img src={image} alt="" />
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      <div className={styles.CardLink}>
        <h3>Join our ecosystem</h3>
        <Button image="../../img/arrow.png" style="Navbar" />
      </div>
    </div>
  );
};

export default Card;
