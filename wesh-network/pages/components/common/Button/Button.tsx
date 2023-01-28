import styles from "./Button.module.scss";

export interface ButtonProps {
  style?: string;
  text?: string;
  image?: string;
  onclick?: () => any;
}

const Button = ({ text, style, image, onclick }: ButtonProps) => {
  return (
    <button
      onClick={onclick}
      className={
        style === "primary"
          ? styles.primary
          : style === "Navbar"
          ? styles.Navbar
          : styles.secondary
      }>
      {text ? text : ""}
      {image && <img src={image} width="15px" alt="" />}
    </button>
  );
};

export default Button;
