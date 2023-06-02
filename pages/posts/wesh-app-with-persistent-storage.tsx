import Head from "next/head"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import styles from "../../styles/Home.module.scss"
import content from "./content.json"
import React from "react"
import hljs from "highlight.js"

export default function Post() {
  const posts = content.items.find((i) => i.id === "3")

  React.useEffect(() => {
    const highlight = async () => {
      await hljs.highlightAll()
    }
    highlight()
  }, [])

  if (!posts) return <span>Not found</span>

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
                  In the
                  <a href="https://wesh.network/posts/wesh-hello-world-app" target="_blank" rel="noreferrer">
                    &nbsp;previous blog post
                  </a>
                  , we made an example “Hello world” app using the Wesh API. But it used in-memory storage for the keys and messages, which are lost when the app closes. It&apos;s
                  possible to export the data to a file before closing, and re-import it when the in-memory app stars again. But in this blog post we will make an example app to
                  use a persistent storage on disk. We&apos;ll also use this to explain some details of what is in the key store and libp2p node.
                </p>
                <p>
                  As before, we write an app similar to the <a href="https://go.dev/doc/tutorial/getting-started">Go tutorial</a>. In a terminal enter:
                </p>
                <pre>
                  <code className="language-bash">
                    {`cd
mkdir persistent
cd persistent
go mod init example/persistent
`}
                  </code>
                </pre>
                <p>
                  As in the previous blog post, paste the following code into your <code className="language-bash">persistent.go</code> file.
                </p>
                <pre>
                  <code className="language-go">
                    {`package main

import (
	"context"
	"fmt"

	"berty.tech/weshnet"
	"berty.tech/weshnet/pkg/protocoltypes"
)`}
                  </code>
                </pre>
                <p>(See the previous blog post for explanation.) To complete the example, paste the following main function and save the file.</p>
                <pre>
                  <code className="language-go">
                    {`
func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	path := "data"
        client, err := weshnet.NewPersistentServiceClient(path)
	if err != nil {
		panic(err)
	}
	defer client.Close()

	config, err := client.ServiceGetConfiguration(ctx,
            &protocoltypes.ServiceGetConfiguration_Request{})
	if err != nil {
		panic(err)
	}

	fmt.Println("Hello, world! My peer ID is", config.PeerID)
}
`}
                  </code>
                </pre>
                <p>
                  This is similar to the previous example, except that we change <code>NewInMemoryServiceClient()</code> to <code>NewPersistentServiceClient(path)</code> , where{" "}
                  <code>path</code> is the directory for the persistent storage. When we run for the first time, Wesh will create the directory and the storage files for a new peer
                  identity. To run, in a terminal enter:
                </p>
                <pre>
                  <code className="language-go">
                    {`go mod tidy
go run . `}
                  </code>
                </pre>
                <p>
                  (You only need to do <code>go mod tidy</code> the first time.) It should print something like{" "}
                  <code>“Hello, world! My peer ID is 12D3KooWJeVb4rbDisCgmUQQxtzNRikgcQxXzSodoy2AyNCdTEWr”</code> . Now, enter the run command again:
                </p>
                <pre>
                  <code className="language-go">go run .</code>
                </pre>
                <p>
                  This time, <code>NewPersistentServiceClient(path)</code> uses the storage files that we created the first time. It should print exactly the same peer ID, meaning
                  that the same identity is persistent on disk. To see the storage files, enter:
                </p>
                <pre>
                  <code className="language-go">ls data</code>
                </pre>
                <p>You should see something like:</p>
                <pre>
                  <code className="language-go">{`
000000.vlog	000002.sst	MANIFEST	config		datastore_spec	repo.lock
000001.sst	KEYREGISTRY	blocks		datastore	keystore	      version
									`}</code>
                </pre>
                <p>
                  Much of the content of these files is encrypted. They are only meant to be accessed through the Wesh API. We aren&apos;t going to look at all of these files or
                  describe their format, but seeing them gives us a chance to discuss the basic types of information in Wesh.
                </p>
                <p>The most important to discuss are the three types of information associated with your identity:</p>

                <p>
                  <ul>
                    <li>
                      The <a href="https://github.com/libp2p/specs/blob/master/peer-ids/peer-ids.md#peer-ids">libp2p host Peer ID</a> is what the example prints. It identifies your
                      computer as a node in libp2p communication.
                    </li>
                    <li>
                      The <a href="https://berty.tech/docs/protocol/#account-creation">Account key pair</a> holds the primary identity that you use to connect to other Wesh users and to
                      join a group.
                    </li>
                    <li>
                      A <a href="https://berty.tech/docs/protocol/#linking-devices">Device key pair</a> is created on each computer or mobile device where you use Wesh, and is connected
                      cryptographically to your Account key pair.
                    </li>
                  </ul>
                </p>

                <p>
                  In Wesh, communication is based on the “group” where messages are secure between group members. For each new group, the Wesh service generates a Metadata log
                  (with info like members joining), a Message log (which we&apos;ll explore in a future blog post), and cryptographic secrets (your own secrets and secrets received from
                  other group members). There are three types of groups:
                </p>

                <p>
                  <ul>
                    <li>
                      Your <a href="https://berty.tech/docs/protocol/#account-group">Account group</a> stores all the secrets and metadata of your account and allows the devices linked
                      to it to sync with each other, as explained above. So, when the example first calls <code>`NewPersistentServiceClient`</code>, Wesh creates one Account key pair, one
                      Device key pair for your computer, and the Account group for it.
                    </li>
                    <li>
                      When you <a href="https://berty.tech/docs/protocol/#adding-contacts">add another Wesh user as a contact</a>, you are both in a <a href="https://berty.tech/docs/protocol/#contact-group">Contact group </a>
                       where just the two of you can communicate securely. No other users can join this group.
                    </li>
                    <li>
                      Finally, you can create or join a <a href="https://berty.tech/docs/protocol/#multi-member-group">Multi-member group</a>. This is what people normally think of when
                      they hear about Wesh, but it&apos;s useful to mention the other types of groups and their purpose.
                    </li>
                  </ul>
                </p>

                <p>
                  Among other maintenance files, the persistent storage has a <b>Network config</b> file with info on how libp2p makes connections. And there is a <b>block store </b>
                  which is part of the peer-to-peer network and stores information you have received or may be useful to other users that your device connects to.
                </p>

                <p>
                  That&apos;s enough for now! For more details, see the links in the text above. Now that we see how to create an account, in the next blog post we&apos;ll look at how to use
                  Wesh to add a contact and send a message.
                </p>
                <p>
                  <i>
                    Posted by {posts.author} on {posts.pubDate}
                  </i>
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
        <div className={styles.credits}>
          <p>Copyright © 2023 – Berty.Tech non-profit organization</p>
          <div>
            <a href="https://crpt.fyi/berty-discord" rel="noreferrer" target="_blank">
              <img src="/img/Discord.png" alt="" />
            </a>
            <a href="https://github.com/berty/weshnet/" rel="noreferrer" target="_blank">
              <img src="/img/Git.png" alt="" />
            </a>
          </div>
        </div>
      </main>
    </>
  )
}
