import styles from "./Footer.module.scss";
const Footer = () => {
  return (
    <div className={styles.Footer}>
      <div className={styles.left}>
        <img className={styles.logo} src="./img/NavBarLogo.png" alt="" />
        {/*<img src="../../img/Footer.png" alt="" />*/}
        <p>
          WESH Network is an open source wild & asynchronous mesh network
          protocol powered by Berty Technologies’s non-profit organisation.
        </p>
      </div>
      <div className={styles.right}>
        <div>
          <h4>ABOUT US</h4>
          <a href="">Berty.Tech</a>
          <a href="">Careers</a>
          <a href="">Developers</a>
          <a href="">Bug bounty</a>
          <a href="">Media kit</a>
        </div>
        <div>
          <h4>PRODUCTS</h4>
          <a href="">Build in Wesh</a>
          <a href="">Berty App</a>
          <a href="">Integration</a>
        </div>
        <div>
          <h4>COMMUNITY</h4>
          <a href="">Join us!</a>
          <a href="">Learn</a>
          <a href="">Job dashboard</a>
          <a href="">FAQ</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
