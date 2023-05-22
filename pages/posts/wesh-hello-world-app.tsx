import Head from "next/head"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import styles from "../../styles/Home.module.scss"
import content from "./content.json"
import React from "react"
import hljs from "highlight.js"

export default function Post() {
  const posts = content.items.find((i) => i.id === "2")

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
                  Now that you have been introduced to Wesh in the
                  <a href="https://wesh.network/posts/1" target="_blank" rel="noreferrer"> previous blog post</a>, it’s time to explore the code. We will write a “Hello World” app, similar to the
                  <a href="https://go.dev/doc/tutorial/getting-started" target="_blank" rel="noreferrer"> Go tutorial </a>
                  which you can read to set up Go on your computer and for other details. (This has been tested with Go 1.19 on macOS and Ubuntu.) This example app will connect to
                  the Wesh service and call a function. When finished, you will be confident that you can use Wesh on your platform.
                </p>
                <p>Similar to the Go tutorial, in a terminal enter:</p>
                <pre>
                  <code className="language-bash">
                    {`cd
mkdir hello
cd hello
`}
                  </code>
									<code className="language-go">
										go mod init example/hello
									</code>
                </pre>
                <p>In your text editor, create a file hello.go in which to write your code. Paste the following code into your hello.go file.</p>
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
                <p>
                  We import <code>fmt</code> as usual in Go code so that we can print a message. We import <code>berty.tech/weshnet</code> so that we can call the Go function to initialize the Wesh service (explained below). Finally, your
                  app interacts with the Wesh service through gRPC which uses Protobuf messages. Therefore, we import the Wesh API Protobuf types with <code>berty.tech/weshnet/pkg/protocoltypes</code>, and we import <code>context</code> because all of the gRPC calls use a Go context object (explained below).
                </p>
                <p>To complete the example, paste the following main function and save the file.</p>
                <pre>
                  <code className="language-go">
                    {`
func main() {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	client, err := weshnet.NewInMemoryServiceClient()
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
                  First we use <code>context.WithCancel</code> to create a <code>ctx</code> object which is used in the gRPC calls, and a <code className="language-js">cancel</code> function to call
									when the app exits. The Context type is part of the Go
                  standard library and you can read
                  <a href="https://pkg.go.dev/context" target="_blank" rel="noreferrer"> its documentation </a> for more details.
                </p>
                <p>
                  Next we call <code>weshnet.NewInMemoryServiceClient</code> to initialize the Wesh service and create a gRPC <code>client</code> that we use to interact with it. Wesh has many init functions for different configurations. A Wesh service
                  can run in memory with a direct connection, or as a separate process with communication through an open socket. We will discuss these options in future blog
                  posts. In this example, we initialize a Wesh service which runs in application memory with a direct connection, and creates a new in-memory user account and data
                  store. If your app doesn’t export the data, then it is lost when the app exits. (It’s also possible to create a persistent data store, which we will explore
                  later.)
                </p>
                <p>
                  Finally, we interact with the Wesh service by calling <code>client.ServiceGetConfiguration</code> , passing the <code>ctx</code> that we created.
                  This method gets the current configuration of the service and is <a href="https://buf.build/berty/weshnet/docs/main:weshnet.protocol.v1#weshnet.protocol.v1.ProtocolService.ServiceGetConfiguration" target="_blank" rel="noreferrer">documented here</a>, along
                  with all the other API calls. Each API call takes a Protobuf request message. In this case there are no parameters, so we create an empty <code>protocoltypes.ServiceGetConfiguration_Request</code>. (We will see more complex examples later.) And each API call returns a Protobuf reply message, or sometimes a stream object. In this case it is a <a href=" https://buf.build/berty/weshnet/docs/main:weshnet.protocol.v1#weshnet.protocol.v1.ServiceGetConfiguration.Reply" target="_blank" rel="noreferrer">ServiceGetConfiguration.Reply</a>. So to finish, we print a happy message with
                  the <code>PeerID</code> of the in-memory IPFS node.
                </p>
                <p>To see the result, in a terminal enter:</p>
                <pre>
                  <code className="language-go">
{`go mod tidy
go run .`}</code>
                </pre>
                <p>
                  (You only need to do <code>go mod tidy</code> the first time.) It should print something like{" "}
                    <code>“Hello, world! My peer ID is 12D3KooWGVMm5mum6qMtwbReiD9Aa93WTuTT2hTHsYxQASTzYUfs”.</code>
                </p>

                <p>
                  In this example, you can now see how the Wesh API can be used with other programming languages. The gRPC support provides helper functions for each language to
                  create the Protobuf messages like <code>ServiceGetConfiguration_Request</code>. And the API calls like{" "}
                  <code>ServiceGetConfiguration</code> only need these Protobuf messages which are language-independent.
                </p>
                <p>
                  Congratulations on your first Wesh app! This one kept all the data in memory. In the next blog post, we’ll see how to create a persistent key store and IPFS node
                  (and talk more about what these are).
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
            {/* <img src="./img/Telegram.png" alt="" /> */}
            {/* <img src="./img/Twitter.png" alt="" /> */}
            {/* <img src="./img/Instagram.png" alt="" /> */}
            {/* <img src="./img/Around.png" alt="" /> */}
            {/* <img src="./img/Linkedin.png" alt="" /> */}
            {/* <img src="./img/Reddit.png" alt="" /> */}
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
