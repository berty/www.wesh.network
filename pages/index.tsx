import Head from "next/head";
import Table from "./components/Table/tables";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.scss";
import Button from "./components/common/Button/Button";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/common/Card/Card";
import AccordionGrid from "./components/AccordionGrid/AccordionGrid";
import Footer from "./components/Footer/Footer";

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
              <h3>Decentralized Extreme Communication Protocol</h3>
              <p>WESH SDK allows developers to build their p2p app easily.</p>
              <Button
                text="Get Started"
                image="./img/blackArrow.png"
                style="primary"
              />
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
                <img src="./img/LogoCubes.png" alt="" />
              </div>
              <div className={styles.Section2Text}>
                <h2>Safe and Secure</h2>
                <p>
                  WESH provides a secured, distributed and asynchronous
                  communication protocol, both with or without internet access
                  using IPFS and direct transports such as BLE and proximity
                  drivers. <br /> <br /> WESH Protocol provides end-to-end
                  encryption and perfect forward secrecy for all the exchanged
                  messages
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.Section3}>
          <div className={styles.Section3Title}>
            <h2>
              <span className={styles.white}>Wesh</span>{" "}
              <span className={styles.grey}>=</span>{" "}
              <span className={styles.green}>No Consensus</span>
            </h2>
            <h3>Wesh Protocol doesn’t need any blockchain</h3>
          </div>
          <div className={styles.Section3Content}>
            <div className={styles.gridIcon}>
              <div className={styles.gridIconColumn}>
                <div className={styles.gridIconRow}>
                  <img src="./img/Asynchronous.png" alt="" />
                  <h3>Asynchronous</h3>
                </div>
                <div className={styles.gridIconRow}>
                  <img src="./img/Interoperability.png" alt="" />
                  <h3>Interoperability</h3>
                </div>
                <div className={styles.gridIconRow}>
                  <img src="./img/Resilient.png" alt="" />
                  <h3>Resilient</h3>
                </div>
              </div>
              <div className={styles.gridIconColumn}>
                <div className={styles.gridIconRow}>
                  <img src="./img/SelfHosted.png" alt="" />
                  <h3>SelfHosted</h3>
                </div>
                <div className={styles.gridIconRow}>
                  <img src="./img/No server.png" alt="" />
                  <h3>No server</h3>
                </div>
                <div className={styles.gridIconRow}>
                  <img src="./img/Secured.png" alt="" />
                  <h3>Secured</h3>
                </div>
              </div>
            </div>

            <Table />
          </div>
        </section>
        <section className={styles.Section4}>
          <div className={styles.Section4Column}>
            <h2>
              Why <span className={styles.green}>Wesh</span> is so different?
            </h2>
            <div className={styles.CardGrid}>
              <Card
                title="On top of IPFS protocol"
                text="Fully decentralized, WESH allows to build serverless applications using IPFS, even on mobiles apps."
                image="./img/Card1.png"
              />
              <Card
                title="App developers"
                text="Made by & for developers that need to build resilient, autonomous and secured decentralized applications."
                image="./img/Card2.png"
              />
              <Card
                title="Everyone"
                text="Open source project that bring free to use tools with +4 years of research & development to the commons."
                image="./img/Card3.png"
              />
            </div>
          </div>
        </section>
        <section className={styles.Section5}>
          <h2>Find your use cases</h2>
          <h3>
            In the near future, anyone, anywhere, can thrive in the
            decentralized economy with metis
          </h3>
          <div className={styles.useCasesGrid}>
            <div className={styles.useCasesColumn}>
              <div>
                <img src="./img/DAO.svg" alt="" />
                <h4>DAO</h4>
              </div>
              <div>
                <img src="./img/P2P.svg" alt="" />
                <h4>P2P Games</h4>
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
                <img src="./img/FREELANCE.svg" alt="" />
                <h4>Freelance Business</h4>
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
        <section className={styles.Section6}>
          <div className={styles.left}>
            <div className={styles.Section6Text}>
              <h3 className={styles.green}>BELIEF</h3>
              <h2>Anyone, anywhere, can thrive in the decentralized economy</h2>
            </div>
            <div className={styles.Section6Grid}>
              <div className={styles.Section6Card}>
                <img src="./img/Vision.png" alt="" />
                <h4>Vision</h4>
                <p>
                  To accelerate the transition of people to blockchain for open,
                  fair, and decentralized business on Web 3.0.
                </p>
              </div>
              <div className={styles.Section6Card}>
                <img src="./img/Mission.png" alt="" />
                <h4>Mission</h4>
                <p>
                  To create an easy-to-use technical and organizational
                  platform, making blockchain accessible to everyone, empowering
                  both personal and professional lives.
                </p>
              </div>
              <div className={styles.Section6Card}>
                <img src="./img/Buisness.png" alt="" />
                <h4>Business</h4>
                <p>
                  Metis is a decentralized economy platform to start, run, and
                  grow any decentralized app, business, and community on the
                  blockchain with ease and scalability.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <img src="./img/imgSection6.png" alt="" />
          </div>
        </section>
        <section className={styles.Section7}>
          <div className={styles.Section7Left}>
            <div className={styles.Section7Text}>
              <h2>Education</h2>
              <h3>
                WESH is building more than just a layer 2 solution: Get an
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
        <Footer />
        <div className={styles.credits}>
          <p>Copyright © 2022 – Berty.Tech non-profit organization</p>
          <div>
            <img src="./img/Telegram.png" alt="" />
            <img src="./img/Twitter.png" alt="" />
            <img src="./img/Discord.png" alt="" />
            <img src="./img/Instagram.png" alt="" />
            <img src="./img/Around.png" alt="" />
            <img src="./img/Linkedin.png" alt="" />
            <img src="./img/Git.png" alt="" />
            <img src="./img/Reddit.png" alt="" />
          </div>
        </div>
      </main>
    </>
  );
}
