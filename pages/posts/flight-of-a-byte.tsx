import Head from "next/head"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import styles from "../../styles/Home.module.scss"
import React from "react"
import hljs from "highlight.js"
import content from "./content.json"

export default function Post() {
  const post = content.items.find((i) => i.id === "5")

  React.useEffect(() => {
    const highlight = async () => {
      await hljs.highlightAll()
    }
    highlight()
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
                <h2>Wesh: Flight of a Byte</h2>
                <p>
                In the previous blog post, we made an example app where the Wesh user account of <code>“client2”</code> sends a message <code className="language-go">“Hello”</code> to a Contact group which is received by the other user account of <code>“client1”</code>. You can use the example to start building your Wesh app, but for development and debugging it helps to understand more about how it works. So this blog post will be a theory dive into some of the details of Wesh communication.
                </p>
                <p>
                When the Wesh app on the computer for <code>client2</code> sends the bytes of a message, what is the <code className="language-go">“flight path”</code> of the bytes of <code className="language-go">“Hello”</code> as they travel to the computer of <code>client1</code>? It&apos;s different from “traditional” networking where, for example, a computer sends the message in a UDP packet to the IP address of the other computer, as described in <a href="https://en.wikipedia.org/wiki/User_Datagram_Protocol" target="_blank" rel="noreferrer">this Wikipedia article</a>. Instead of a specific IP address, Wesh communication happens between <a href="https://docs.libp2p.io/concepts/fundamentals/peers/" target="_blank" rel="noreferrer">libp2p peers</a>, where the client&apos;s PeerID is the value that we&apos;ve seen in previous examples and is the same no matter how the client is connected to the network.
                </p>
                <h3>Peer discovery</h3>
                <p>
                The “glue” between a libp2p peers and a more traditional network address is <a href="https://docs.libp2p.io/concepts/discovery-routing/overview/" target="_blank" rel="noreferrer">peer discovery</a>. There are a lot of details that we won&apos;t go into regarding types of discovery, peer authentication, etc. In this blog post, we just describe the minimal steps for how <code>client1</code> receives the message from <code>client2</code>. When the libp2p service of <code>client1</code> discovers the computer of <code>client2</code>, it opens a network connection (<a href="https://github.com/libp2p/go-libp2p-pubsub/blob/6d73cd4b56bf9d7fdd0c0caaed629a3d51027a75/comm.go#L115" target="_blank" rel="noreferrer">code</a>) and reads from it using a traditional byte stream (<a href="https://github.com/libp2p/go-libp2p-pubsub/blob/6d73cd4b56bf9d7fdd0c0caaed629a3d51027a75/comm.go#L66">code</a>). (We give links to code for curious readers, but this isn&apos;t a code tutorial and you can skip the code links.)

                We&apos;ve mentioned the traditional networking code “under the hood” to remove some of the mystery. But that code doesn&apos;t immediately read the message from <code>client2</code>. Instead, there are some communication steps which allow Wesh to use libp2p to operate in a peer-to-peer environment.
                </p>
                
                <h3>Message log and “head”</h3>
                <p>
                To send a message in traditional networking, one user connects to the network address of the other user and transmits the message. Or the user connects to a central server and appends to the message log there, while the other user connects to the same central server and reads the message log. But this doesn&apos;t work in a peer-to-peer environment. Instead, the goal is for each group member to have a copy of the message log, where there is a “head” (the latest message) which refers to all the previous messages in a chain. To send a message to the group, a member adds to the local copy of the message log and updates the “head”. This will be synchronized with the other members.
                </p> 
                <p>
                Without a central server, each group member may add to the message log and receive updates from others in a different order. But the synchronization algorithm ensures “eventual consistency”: after exchanging enough messages, eventually all the users will have the same message log in the same order. At that point they will all have the same “head” message, which refers to all the previous messages in a chain. Wesh currently uses OrbitDB for this, and you can read the details in <a href="https://github.com/orbitdb/field-manual/blob/main/03_The_Architecture_of_OrbitDB/02_ipfs-log.md" target="_blank" rel="noreferrer">their manual</a>. (In the future, Wesh may use a simpler library but it will still have the same concept of a synchronized message log with a head.)
                </p>
                <p>
                 As mentioned, <code>client2</code> doesn&apos;t send the message “Hello” directly to the other group members. Instead, it puts the message in its own message log and updates the head. The other members learn about the new head which means there is a new message to fetch.
                </p>
                <h3>libp2p pubsub</h3>
                <p>
                 So now the question is, how does <code>client1</code> learn that <code>client2</code> says there is a new message log head? This uses libp2p pubsub where peers can subscribe to a topic and publish a pubsub message to that topic, or receive pubsub messages. (We say “pubsub message” to not confuse with the ordinary messages in the log which we&apos;ll discuss below.)
                </p>
                <p>
                libp2p pubsub is a powerful tool with algorithms which allow it to scale to many peers and to make sure they all get the pubsub message. You can read more in <a href="https://docs.libp2p.io/concepts/pubsub/overview/" target="_blank" rel="noreferrer">its documentation</a>, but for this blog post we only need to say that the Wesh group has a libp2p topic name like 
                &nbsp;<code>
                /orbitdb/bafyreihpdptqwgpuwu4ob6nusxebmdx6fm6mq5pma5hva6eu5u74pflo7e/2ac4e88c5272f900c76fd36989f9780e5b2c95d75d38fe5bcef0345b34bc4806_wesh_group_messages
                    </code>
                &nbsp;a pubsub message to this topic that contains the message log head. The libp2p on <code>client1</code> receives this pubsub message and sends it (<a href="https://github.com/libp2p/go-libp2p-pubsub/blob/6d73cd4b56bf9d7fdd0c0caaed629a3d51027a75/pubsub.go#L978" target="_blank" rel="noreferrer">code</a>) internally to all processes which are subscribed to the topic. The Wesh application of <code>client1</code> has used ActivateGroup and is therefore subscribed to this topic and receives the pubsub message (<a href="https://github.com/berty/go-orbit-db/blob/368618e06b3be3bd17952d167d0e2f4fa03960ff/pubsub/pubsubraw/pubsub.go#L76" target="_blank" rel="noreferrer">code</a>).
                </p>
                <h3>IPFS to fetch the message</h3>
                <p>
                libp2p pubsub doesn&apos;t care about the meaning of a pubsub message. It only makes sure that all subscribers get it. Remember that the next step is to synchronize the message log, which is handled by the local message store of <code>client1</code>. After checking that it&apos;s not a repeat, the pubsub message is forwarded (<a href="https://github.com/berty/go-orbit-db/blob/368618e06b3be3bd17952d167d0e2f4fa03960ff/pubsub/pubsubraw/pubsub.go#L96">code</a>) as an EventPubSubMessage to the message store which receives it (<a href="https://github.com/berty/go-orbit-db/blob/368618e06b3be3bd17952d167d0e2f4fa03960ff/stores/basestore/base_store.go#L1133">code</a>). This confirms that the type of pubsub message is to update the message log head, and it checks to make sure the head was not already processed. (If <code>client1</code> has already received the same message log head, maybe from another peer, then it doesn&apos;t need to do more processing. This may seem trivial, but it&apos;s important because it&apos;s efficient to exchange these small “head” messages frequently between peers.)  
                </p>
                <p>
                The message store receives (<a href="https://github.com/berty/go-orbit-db/blob/368618e06b3be3bd17952d167d0e2f4fa03960ff/baseorbitdb/orbitdb.go#L828" target="_blank" rel="noreferrer">code</a>) the event for a new head which contains the <code>CID</code> of the message. The message (which may be large) is fetched with IPFS, not with libp2p pubsub (which is better for small messages). If you don&apos;t know what a <code>CID</code> is and how IPFS uses it to fetch content, then you can <a href="https://docs.ipfs.tech/concepts/content-addressing/" target="_blank" rel="noreferrer">read all about it</a>. Notice that using a <code>CID</code> to fetch the message (<a href="https://github.com/berty/go-ipfs-log/blob/11feb569ceaca84229987a039e102d799af9ccaa/entry/entry.go#L486" target="_blank" rel="noreferrer">code</a>) like “Hello” is a separate process from synchronizing heads. Maybe IPFS has already fetched the same <code>CID</code>, or maybe it can be fetched from another group member that is not <code>client2</code>. Wesh takes advantage of the efficient IPFS algorithms.
                </p>
                <h3>Decrypting and finishing</h3>
                <p>
                We&apos;re almost done! When the “Hello” message is fetched, it&apos;s placed in the local copy of the message log in the correct order. (Messages in the device&apos;s storage remain encrypted.) This internally sends the <code>EventReplicated</code> event which is received (<a href="https://github.com/berty/weshnet/blob/aa44f7d64dcbc54c643cfddfaac8aa0a4d80f6a0/store_message.go#L452" target="_blank" rel="noreferrer">code</a>) by the Wesh message monitor. We started at the libp2p “level” which doesn&apos;t care about the meaning of pubsub messages, up through the message log level which only cares about the correct order of messages. Now at the “top” level, Wesh must use <code>client1&apos;s</code> cryptographic keys to decrypt (<a href="https://github.com/berty/weshnet/blob/aa44f7d64dcbc54c643cfddfaac8aa0a4d80f6a0/store_message.go#L139" target="_blank" rel="noreferrer">code</a>) the message.
                </p>
                <p>
                The decrypted message is sent internally (<a href="https://github.com/berty/weshnet/blob/aa44f7d64dcbc54c643cfddfaac8aa0a4d80f6a0/store_message.go#L195" target="_blank" rel="noreferrer">code</a>) to all monitoring processes, including the <code>GroupMessageList</code> service (<a href="https://github.com/berty/weshnet/blob/aa44f7d64dcbc54c643cfddfaac8aa0a4d80f6a0/api_event.go#L191" target="_blank" rel="noreferrer">code</a>). The <code>client1</code> application has called <code>GroupMessageList</code>, so the “Hello” message is sent (<a href="https://github.com/berty/weshnet/blob/aa44f7d64dcbc54c643cfddfaac8aa0a4d80f6a0/api_event.go#L199" target="_blank" rel="noreferrer">code</a>) to the application which prints the message.
                </p>
                <h3>Flight of a Byte</h3>
                <p>
                In summary, the flight of a message from <code>client2</code> to <code>client1</code> starts when the <code>client2</code> peer is discovered, subscribes to the libp2p pubsub topic for the group messages and publishes its message log head. <code>client1</code> doesn&apos;t have this head yet, so it uses the <code>CID</code> to fetch the message using IPFS. When the message arrives, it is added to <code>client1&apos;s</code> copy of the message log in the correct order. Wesh sends this new message to processes using the <code>GroupMessageList</code> service, such as the sample application which receives it and prints “Hello”. Easy, right? Each of these steps is needed to make sure communication can still happen even if a peer disconnects or reconnects at a different network address.
                </p>
                <p>
                Now that you know what to expect when your Wesh application communicates, we&apos;ll return to some more examples in future blog posts.
                </p>
                <p>
                  <i>
                    Posted by {post?.author} on {post?.pubDate}
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
