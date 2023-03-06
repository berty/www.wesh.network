import Button from "../Button/Button";
import styles from "./BlogCard.module.scss";

export interface BlogCardProps {
  title: string;
  text: string;
  image: string;
  url: string;
}

const BlogCard = ({ title, text, image, url }: BlogCardProps) => {
  return (
    <div className={styles.CardContainer}>
      <div className={styles.CardText}>
        <img src={image} alt="" />
        <a href={"/posts/" + url }>
          <h3>{title}</h3>
          <p>{text}</p>
        </a>
      </div>
      {/* <div className={styles.CardLink}> */}
        {/* <h3>Join our ecosystem</h3> */}
        {/* <Button image="../../img/arrow.png" style="Navbar" /> */}
      {/* </div> */}
    </div>
  );
};

export default BlogCard;
