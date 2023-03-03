import { getPostIdList } from '../components/Blog/blog';
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import styles from "../../styles/Home.module.scss";
import content from "./content.json"
import parse from 'html-react-parser';




export default function Post({ postData }) {
  let posts;
  posts =  (content.items[0])
  console.log(posts)

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

        <section className={styles.SectionBlog}>
          <div className={styles.SectionBlogContainer}>
            <div className={styles.SectionBlogCard}>
              <div className={styles.SectionBlogText}>
                <h2>{posts.title}</h2>
                <p>
                  {parse(posts.content)}
                </p>
                <p>
                  <i>Posted by {posts.author} on the {posts.pubDate}</i>
                </p>
              </div>
            </div>
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
            <a href="https://crpt.fyi/berty-discord" rel="noreferrer" target="_blank"> <img src="/img/Discord.png" alt="" /></a>
            <a href="https://github.com/berty/weshnet/" rel="noreferrer" target="_blank"><img src="/img/Git.png" alt="" /></a>
          </div>
        </div>
      </main>
    </>

  );
}
