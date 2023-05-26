import React from "react"
import Navbar from "../Navbar/Navbar"
import styles from "../../../styles/Home.module.scss"
import Head from "next/head"
import { useRouter } from "next/navigation"

type Props = {
  destination: string
}

function Redirect({ destination }: Props) {
  const { push } = useRouter()

  React.useEffect(() => {
    setTimeout(() => {
      push(destination)
    }, 2000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
                <p>
                  Wait. You are being redirected to the new url <a href={destination}>{destination}</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Redirect
