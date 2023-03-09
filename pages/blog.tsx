import Head from "next/head";
import Table from "./components/Table/tables";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.scss";
import Button from "./components/common/Button/Button";
import Navbar from "./components/Navbar/Navbar";
import Card from "./components/common/Card/Card";
import AccordionGrid from "./components/AccordionGrid/AccordionGrid";
import Footer from "./components/Footer/Footer";

import React, { Component } from "react";
import BlogCard from "./components/common/BlogCard/BlogCard";
import content from "./posts/content.json"

const inter = Inter({ subsets: ["latin"] });




export default function Blogpage() {
  let posts = content;
  console.log("123");
  console.log(posts.items.length);
  console.log("123");
  const resultsRender = []
    for (var i = 0; i < posts.items.length; i += 3) {
      var post1=
        <BlogCard
          key={i}
          title={posts.items[i].title}
          text={`${
            posts.items[i].description.substring(0, 200)}...`}
          image={posts.items[i].img}
          url={posts.items[i].id}
         />
      var post2 = <></>
      if(posts.items[i+1] != undefined){
      post2 = <BlogCard
        key={i}
        title={posts.items[i+1].title}
        text={`${
          posts.items[i+1].description.substring(0, 200)}...`}
        image={posts.items[i+1].img}
        url={posts.items[i+1].id}
       />
     }
      var post3 = <></>
      if(posts.items[i+2] != undefined){
        post3=
        <BlogCard
          key={i}
          title={posts.items[i+2].title}
          text={`${
            posts.items[i+2].description.substring(0, 200)}...`}
          image={posts.items[i+2].img}
          url={posts.items[i+2].id}
         />
      }
      var title=<></>;
      if(i == 0){
        title =
        <h2>
          <span className={styles.green}>BLOG</span>
        </h2>
      }
      resultsRender.push(
        <section className={styles.Section4}>
        {title}

          <div className={styles.Section4Column}>
            <div className={styles.CardGrid}>
              {post1}
              {post2}
              {post3}
            </div>
          </div>
        </section>
      );
    }
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
        {resultsRender}

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
