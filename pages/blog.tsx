import Head from "next/head"
import Table from "./components/Table/tables"
import { Inter } from "@next/font/google"
import styles from "../styles/Home.module.scss"
import Button from "./components/common/Button/Button"
import Navbar from "./components/Navbar/Navbar"
import Card from "./components/common/Card/Card"
import AccordionGrid from "./components/AccordionGrid/AccordionGrid"
import Footer from "./components/Footer/Footer"

import React, { Component } from "react"
import BlogCard from "./components/common/BlogCard/BlogCard"
import content from "./posts/content.json"

const inter = Inter({ subsets: ["latin"] })

export default function Blogpage() {
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
        <section className={styles.Section4}>
          <h2>
            <span className={styles.green}>BLOG</span>
          </h2>

          <div className={styles.SectionGridColumns}>
            {content.items.map((post) => (
              <BlogCard key={post.id} title={post.title} text={`${post.description.substring(0, 200)}...`} image={post.img} url={post.link} />
            ))}
          </div>
        </section>
        <Footer />
        <div className={styles.credits}>
          <p>Copyright © 2025 – Berty.Tech non-profit organization</p>
          <div>
            {/* <img src="./img/Telegram.png" alt="" /> */}
            {/* <img src="./img/Twitter.png" alt="" /> */}
            {/* <img src="./img/Instagram.png" alt="" /> */}
            {/* <img src="./img/Around.png" alt="" /> */}
            {/* <img src="./img/Linkedin.png" alt="" /> */}
            {/* <img src="./img/Reddit.png" alt="" /> */}
            <a href="https://crpt.fyi/berty-discord" rel="noreferrer" target="_blank">
              {" "}
              <img src="./img/Discord.png" alt="" />
            </a>
            <a href="https://github.com/berty/weshnet/" rel="noreferrer" target="_blank">
              <img src="./img/Git.png" alt="" />
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
