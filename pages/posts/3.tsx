import Head from "next/head"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import styles from "../../styles/Home.module.scss"
import content from "./content.json"
import React, { useEffect } from "react"
import Redirect from "../components/Redirect/Redirect"

export default function Post() {
  return <Redirect destination="/posts/wesh-app-with-persistent-storage" />
}
