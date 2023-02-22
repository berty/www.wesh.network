import styles from "./tables.module.scss";

const Table = () => {
  return (
    <div className={styles.board}>
    <h3>Why power your product with a <span className={styles.green}>Web3</span> protocol ?</h3>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td className={styles.grey}>{"Web2"}</td>
            <td>{"Web3"}</td>
          </tr>
          <tr>
            <td>Privacy</td>
            <td className={styles.grey}>Weakened by central management of identities</td>
            <td>Strengthened by users managing their own identity</td>
          </tr>
          <tr>
            <td>Security</td>
            <td className={styles.grey}>Dependent on central authorities</td>
            <td>Dependent on mathematical properties of distributed algorithms</td>
          </tr>
          <tr>
            <td>Routing</td>
            <td className={styles.grey}>Messages may never arrive due to single points of failure</td>
            <td>Messages will eventually arrive if a viable route exists</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
