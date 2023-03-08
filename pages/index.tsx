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
        <section className={styles.Section1}>
          <div className={styles.MainTitle}>
            <div>
              <h1>Async mesh network protocol</h1>
              <h3>With Wesh&apos;s toolkit, building p2p apps has never been simpler</h3>
              <p>Wesh network is a decentralized extreme communication protocol</p>
              <a target="_blank" href="https://github.com/berty/weshnet/" rel="noopener noreferrer">
                <Button
                  text="Get Started"
                  image="./img/blackArrow.png"
                  style="primary"
                />
              </a>
            </div>
          </div>
          <div className={styles.HomeImage}>
            <img src="./img/HomeImage.png" alt="Homepage Image" />
          </div>
        </section>
        <section className={styles.Section2}>
          <div className={styles.Section2Container}>
            <div className={styles.Section2Card}>
              <div className={styles.Section2Img}>
                <img src="./img/LogoCubes.svg" alt="" />
              </div>
              <div className={styles.Section2Text}>
                <h2>Safe and Secure</h2>
                <p>
                  Wesh provides a secured, distributed and asynchronous
                  communication protocol, both with or without internet access
                  using IPFS and direct transports such as BLE and proximity
                  drivers. <br /> <br /> Wesh Protocol provides end-to-end
                  encryption and perfect forward secrecy for all the exchanged
                  messages
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.Section6}>
          <div className={styles.left}>
            <div className={styles.Section6Text}>
              <h3 className={styles.green}>RESILIENT</h3>
              <h2>Wesh&apos;s p2p toolkit has you covered</h2>
            </div>
            <div className={styles.Section6Grid}>
              <div className={styles.Section6Card}>
                <img src="./img/Resilient.png" alt="" />
                <h4>Resilient</h4>
                <p>
                  Distributed p2p transmissions and hosting over IPFS powered by CRDT algorithm
                </p>
              </div>
              <div className={styles.Section6Card}>
                <img src="./img/Secured.png" alt="" />
                <h4>Secure</h4>
                <p>
                  Efficient end-to-end encryption and perfect forward secrecy to prevent eavesdropping and provide reliable identity access management
                </p>
              </div>
              <div className={styles.Section6Card}>
                <img src="./img/Interoperability.png" alt="" />
                <h4>Interoperable</h4>
                <p>
                  Powered by Go, and Operable on iOS and Android devices
                </p>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <img src="./img/imgSection6.png" alt="" />
          </div>
        </section>
        <section className={styles.Section3}>
          <div className={styles.Section3Title}>
            <h2>
              <span className={styles.white}>Wesh</span>{" "}
              <span className={styles.grey}>=</span>{" "}
              <span className={styles.green}>Flexible </span>
              <span className={styles.grey}>+</span>{" "}
              <span className={styles.green}>Future proof </span>
              <span className={styles.grey}>+</span>{" "}
              <span className={styles.green}>Free</span>
            </h2>
            <h3>Focus on buildling, we handle the peer-to-peer</h3>
          </div>
          <div className={styles.Section3Content}>
            <div className={styles.gridIcon}>
              <div className={styles.gridIconColumn}>
                <div className={styles.gridIconRow}>
                  <img src="./img/Asynchronous.png" alt="" />
                  <h3>Identity management</h3>
                  <p>Distributed authentication and authorisation. Multiple devices per identity</p>
                </div>
                <div className={styles.gridIconRow}>
                  <img src="./img/Interoperability.png" alt="" />
                  <h3>Groups</h3>
                  <p>Resilient p2p transmissions between groups of mutually-authorised users</p>
                </div>
              </div>
              <div className={styles.gridIconColumn}>
                <div className={styles.gridIconRow}>
                  <img src="./img/SelfHosted.png" alt="" />
                  <h3>Offline communication</h3>
                  <p>Offline peer to peer communication over Bluetooth Low Energy </p>
                </div>
                <div className={styles.gridIconRow}>
                  <img src="./img/No server.png" alt="" />
                  <h3>RDV servers</h3>
                  <p>Improved performance and availability with decentralised rendez-vous servers</p>
                </div>
              </div>
            </div>

            <Table />
          </div>
        </section>
        <section className={styles.Section4}>
          <div className={styles.Section4Column}>
            <h2>
              Why <span className={styles.green}>Wesh</span> is for you?
            </h2>
            <div className={styles.CardGrid}>
              <Card
                title="Future-proof"
                text="With the power of decentralisation, be confident your service cannot be taken down or censored"
                image="./img/Card1.png"
              />
              <Card
                title="Designed for builders"
                text="Get started in a heartbeat. Download our repo and read our documentation to get onboarded"
                image="./img/Card2.png"
              />
              <Card
                title="Open"
                text="Open source project that brings free to use tools with 4+ years of research & development to the public"
                image="./img/Card3.png"
              />
            </div>
          </div>
        </section>
        <section className={styles.Section4}>
          <div className={styles.Section4Column}>
            <h2>
              Find your <span className={styles.green}>use case</span>
            </h2>

            <div className={styles.CardGrid}>
              <Card
                title="Messaging"
                text="Just like berty messenger, develop your own private p2p messaging mobile applications "
                image="./img/berty.svg"
              />
              <Card
                title="Offline communication"
                text="When the internet is down, your application can thrive"
                image="./img/OPEN.svg"
              />
              <Card
                title="Social"
                text="Build the dating app that doesn’t stalk its users"
                image="./img/Com.svg"
              />
            </div>
            <div className={styles.CardGrid}>
              <Card
                title="Collaboration"
                text="Make your users truly own the whiteboard they collaborate on"
                image="./img/Colab.svg"
              />
              <Card
                title="IoT"
                text="Ignite IoT networks that can share information such as air quality when traditional connectivity fails"
                image="./img/IOT.svg"
              />
              <Card
                title="Offgrid"
                text="Create reliable communication channels with third parties in remote locations"
                image="./img/Volun.svg"
              />
            </div>
          </div>
        </section>
        {/*
        <section className={styles.Section5}>
          <h2>Find your <span className={styles.green}>use case</span></h2>
          <h3>
            Limitless possiblities, up to your imagination
          </h3>
          <div className={styles.useCasesGrid}>
            <div className={styles.useCasesColumn}>
              <div>
                <img src="./img/DAO.svg" alt="" />
                <h4>DAO</h4>
              </div>
              <div>
                <img src="./img/p2p.svg" alt="" />
                <h4>p2p Games</h4>
              </div>
              <div>
                <img src="./img/GIG.svg" alt="" />
                <h4>Gig Economy</h4>
              </div>
              <div>
                <img src="./img/OPEN.svg" alt="" />
                <h4>Open Source Projects</h4>
              </div>
            </div>
            <div className={styles.useCasesColumn}>
              <div>
                <img src="./img/DAPP.svg" alt="" />
                <h4>DAPP</h4>
              </div>
              <div>
                <img src="./img/berty.svg" alt="" />
                <h4>Messaging</h4>
              </div>
              <div>
                <img src="./img/SHARING.svg" alt="" />
                <h4>Sharing Economy</h4>
              </div>
              <div>
                <img src="./img/VOLUN.svg" alt="" />
                <h4>Volunteer Projects</h4>
              </div>
            </div>
            <div className={styles.useCasesColumn}>
              <div>
                <img src="./img/DEFI.svg" alt="" />
                <h4>DEFI 2.0</h4>
              </div>
              <div>
                <img src="./img/SOCIAL.svg" alt="" />
                <h4>Social Reputation Business</h4>
              </div>
              <div>
                <img src="./img/COM.svg" alt="" />
                <h4>Community Economy</h4>
              </div>
              <div>
                <img src="./img/DEV.svg" alt="" />
                <h4>Developers Community</h4>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.Section7}>
          <div className={styles.Section7Left}>
            <div className={styles.Section7Text}>
              <h2>Education</h2>
              <h3>
                Wesh is building more than just a layer 2 solution: Get an
                overview of everything.
              </h3>
            </div>
            <div className={styles.Section7Content}>
              <div className={styles.useCasesColumn}>
                <div>
                  <img src="./img/Gomobile.png" alt="" />
                  <h4>Gomobile-IPFS</h4>
                </div>
                <div>
                  <img src="./img/IPFS.png" alt="" />
                  <h4>IPFS Storage</h4>
                </div>
                <div>
                  <img src="./img/Modular.png" alt="" />
                  <h4>Modular</h4>
                </div>
              </div>
              <div className={styles.useCasesColumn}>
                <div>
                  <img src="./img/Secured1.png" alt="" />
                  <h4>Secured</h4>
                </div>
                <div>
                  <img src="./img/Made.png" alt="" />
                  <h4>Made for Builders</h4>
                </div>
                <div>
                  <img src="./img/Ecosystem.png" alt="" />
                  <h4>Ecosystem Agnostic</h4>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <img src="./img/imgSection7.png" alt="" />
          </div>
        </section>

        <section className={styles.Section8}>
          <h2>Frequently asked questions</h2>
          <AccordionGrid />
        </section>
        */}
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
