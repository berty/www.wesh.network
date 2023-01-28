import styles from "./tables.module.scss";

const Table = () => {
  return (
    <div className={styles.board}>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td className={styles.grey}>{"Ethereum+Metis ( Layer 1)"}</td>
            <td>{"Ethereum+Metis ( Layer 2)"}</td>
          </tr>
          <tr>
            <td>Transaction cost</td>
            <td className={styles.grey}>High</td>
            <td>Low</td>
          </tr>
          <tr>
            <td>Transaction Speed</td>
            <td className={styles.grey}>Slow</td>
            <td>Fast</td>
          </tr>
          <tr>
            <td>Functionality</td>
            <td className={styles.grey}>Limited</td>
            <td>Rich</td>
          </tr>
          <tr>
            <td>Usability</td>
            <td className={styles.grey}>Difficult</td>
            <td>Easy</td>
          </tr>
          <tr>
            <td>Affordable storage</td>
            <td className={styles.grey}>None</td>
            <td>Native</td>
          </tr>
          <tr>
            <td>Scalability</td>
            <td className={styles.grey}>Expensive</td>
            <td>Effective</td>
          </tr>
          <tr>
            <td>DAO quickstart</td>
            <td className={styles.grey}>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>Your app</td>
            <td className={styles.grey}>Blochain, chained</td>
            <td>Blockchain, unchained</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
