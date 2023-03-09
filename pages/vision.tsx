import Head from "next/head";
import Table from "./components/Table/tables";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.scss";
import Button from "./components/common/Button/Button";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/common/Card/Card";
import AccordionGrid from "./components/AccordionGrid/AccordionGrid";
import Footer from "./components/Footer/Footer";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Wesh Network</title>
        <meta name="description" content="Wesh Network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.Body}>
        <Navbar />
        <section className={styles.Section6}>
          <div className={styles.left}>
            <div className={styles.Section6Text}>
              <h2 className={styles.green}>VISION</h2>
            </div>
            <div className={styles.Section6Text}>
              <h3 className={styles.space}>The cornerstone of the internet of tomorrow</h3>
            </div>
            <div className={styles.Section6Grid}>
              <p className={styles.space}>Our ambition is to establish a decentralized communication protocol as a cornerstone of the internet of tomorrow. We aim to empower web3 developers to bring about unstoppable peer-to-peer communication to billions of devices. </p>
            </div>
            <div className={styles.Section6Grid}>

              <p className={styles.space}>We are driven by a mission to empower humanity with the power of unrestricted communication, free from the limitations of centralized infrastructure and censorship.</p>
            </div>
            <div className={styles.Section6Grid}>

              <p className={styles.space}>Our open-source approach promotes contributions and transparency, allowing anyone to take part in our pursuit of uncompromised communication.</p>
            </div>

          </div>
          <div className={styles.right}>
            <img src="./img/imgSection6.png" alt="" />
          </div>
        </section>

        <section className={styles.Section6}>
          <div className={styles.left}>
            <div className={styles.Section6Text}>
              <h3 className={styles.space} >Crossing the chasm</h3>
            </div>
            <div className={styles.Section6Grid}>

              <p className={styles.space}>Wesh Network is poised to become a key component of the alternate Internet, powering numerous decentralized systems such as blockchains, messaging apps, dApps, and social tools. As such, our toolkit will become a fundamental component of the web3 builder&apos;s workshop.</p>
            </div>
            <div className={styles.Section6Grid}>

              <p className={styles.space}>Through collaborations and integrations with other related projects that follow a decentralized approach, our protocol will reach new heights of capability and performance. We&apos;ve partnered with governments, innovators in the web3 space, and military forces who plan to implement Wesh Protocol to build secure and robust communication tools for extreme contexts.</p>
            </div>
            <div className={styles.Section6Grid}>

              <p className={styles.space}>The Wesh Network protocol is designed to offer unparalleled resilience coupled with interoperability, security, and modularity. Humanity deserves access to free, reliable and censorship-resistant communication. Berty is building the Wesh Network to fulfill this mission and become the foundation of unstoppable communication for the Internet&apos;s next era.</p>
            </div>
          </div>
          <div className={styles.right}>
            <img src="./img/imgSection7.png" alt="" />
          </div>
        </section>


        <Footer />
        <div className={styles.credits}>
          <p>Copyright © 2023 – Berty.Tech non-profit organization</p>
          <div>
            {/* <img src="./img/Telegram.png" alt="" /> */ }
            {/* <img src="./img/Twitter.png" alt="" /> */ }
            {/* <img src="./img/Instagram.png" alt="" /> */ }
            {/* <img src="./img/Around.png" alt="" /> */ }
            {/* <img src="./img/Linkedin.png" alt="" /> */ }
            {/* <img src="./img/Reddit.png" alt="" /> */ }
            <a href="https://crpt.fyi/berty-discord" rel="noreferrer" target="_blank"> <img src="./img/Discord.png" alt="" /></a>
            <a href="https://github.com/berty/weshnet/" rel="noreferrer" target="_blank"><img src="./img/Git.png" alt="" /></a>
          </div>
        </div>
      </main>
    </>
  );
}
