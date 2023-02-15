import styles from "./tables.module.scss";

const Table = () => {
  return (
    <div className={styles.board}>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td className={styles.grey}>{"Ethereum"}</td>
            <td>{"Wesh network"}</td>
          </tr>
          <tr>
            <td>Peer-to-peer</td>
            <td className={styles.grey}>✔</td>
            <td>✔</td>
          </tr>
          <tr>
            <td>Transmission costs</td>
            <td className={styles.grey}>High</td>
            <td>Zero</td>
          </tr>
          <tr>
            <td>Consensus</td>
            <td className={styles.grey}>Yes</td>
            <td>No</td>
          </tr>
          <tr>
            <td>Modularity</td>
            <td className={styles.grey}>Limited</td>
            <td>High</td>
          </tr>
          <tr>
            <td>Nodes</td>
            <td className={styles.grey}>Heavy & rewarded</td>
            <td>Light & unrewarded</td>
          </tr>
          <tr>
            <td>Cryptography</td>
            <td className={styles.grey}>Keccak256 & secp256k1</td>
            <td>Ed25519 & X25519</td>
          </tr>

        </tbody>
      </table>
    </div>
  );
};

export default Table;
