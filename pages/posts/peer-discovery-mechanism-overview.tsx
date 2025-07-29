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
                <h2>Peer Discovery Mechanism Overview</h2>
    
    <p><span>The Wesh Network protocol was created with the purpose of
        becoming a tool for building resilient communication
        applications. Peer discovery is a fundamental mechanism of Wesh
        Network that needs to happen before two or more users can
        exchange messages. In this article we will take a detailed look
        at the main peers discovery options so builders can better
        understand how these can be used.</span></p>
    
    <p><span>Before diving into the peer discovery let’s first remember
        a few important concepts that are specific to Wesh Network.</span></p>
    
    <p><span>First, it is important to remember that in Wesh Network the
        entire concept of exchanging messages happens inside a </span><span><a
href="https://wesh.network/posts/share-contact-and-send-message">Contact
          group</a></span><span>. This Contact group can be made of two
        users or more. Thus, the first step is to create a Contact
        group. Going deeper in the rabbit hole, the communication inside
        a Contact group is enabled by the </span><span><a
          href="https://blog.ipfs.tech/25-pubsub">pubsub</a></span><span>&nbsp;mechanism.
      </span></p>
    
    <p><span>Second, unlike other communication solutions where message
        recipients are identified via their IP address, Wesh Network
        relies on the unique </span><span><a
          href="https://docs.libp2p.io/concepts/fundamentals/protocols">libp2p</a></span><span>&nbsp;identifier

        or </span><span><a
          href="https://docs.libp2p.io/concepts/fundamentals/peers">PeerID</a></span><span>.
        These are mechanisms specific to the IPFS protocol. In </span><span><a
          href="https://wesh.network/posts/flight-of-a-byte">this
          article</a></span><span>&nbsp;you can find a more detailed
        example on how the PeerID is used in Wesh. <br/>
      </span></p>
    
    <p><span>Coming back, Wesh Network relies on 3 main mechanisms to
        achieve peer discovery.</span></p>
    
    <h3>Peer discover via mDNS</h3>
    <p><span>The most effective and straightforward peer discovery
        method is doing it via the </span><span><a
          href="https://en.wikipedia.org/wiki/Multicast_DNS">mDNS
          protocol</a></span><span>. This is a protocol enabled on
        pretty much the majority of LAN networks. </span></p>
    
    <p><span>Naturally, it is also the most restrictive method as it
        works only for devices residing on the same LAN network.</span></p>
    
    <p><img alt="" src="/img/blog6-image22.png"/></p>
    
    
    <h3>Peer discovery using DHT seed nodes</h3>
    <p><span>Outside the LAN, the most reliable method for peer
        discovery is using the IPFS DHT network. DHT stands for
        Distributed Hash Table and is a public network made up of DHT
        nodes. </span></p>
    
    <p><span>In short, for peer discovery to work both devices that use
        Wesh Network protocol must be able to reach at least one node in
        the DHT network. It doesn’t need to be the same node; the DHT
        network will use the PeerID of each device to find the
        corresponding user.</span></p>
    
    <p><span>DHT is a pretty complicated technology and for the
        peer-to-peer builder enthusiasts out there we invite you to
        check out the official </span><span><a
          href="https://pl-launchpad.io/curriculum/libp2p/dht">DHT
          documentation</a></span><span>&nbsp;from IPFS.</span></p>
    
    <p><img alt="" src="/img/blog6-image11.jpg"/></p>
    
    
    <h3>Peer discovery using an RDVP node</h3>
    <p><span>An RDVP node is similar to a DHT node, but is one that you
        can set up yourself. We will come back to this topic in a
        dedicated article later, but in the mean-time you can already
        check out the basics </span><span><a
href="https://github.com/berty/weshnet/tree/main/infra#configuring-your-app-to-use-the-services">here</a></span><span>.</span></p>
    
    <p><span>Fresh out of the box, the Wesh Network protocol uses the
        Berty RDVP as its default node. Of course, as a builder you can
        change this at any time. For an actual example on how to do
        this, check out </span><span><a
href="https://github.com/berty/weshnet/tree/main/infra#configuring-your-app-to-use-the-services">this

          section</a></span><span>&nbsp;of the infra setup </span><span>README.</span></p>
    
    <p><span>In Wesh, an RDVP node is identified via its </span><span><a
          href="https://docs.libp2p.io/concepts/fundamentals/addressing">multiaddress</a></span><span>&nbsp;</span><span>(maddr),
        a concept used in IFPS which is basically a combination of the
        node’s IP address, port address and node’s PeerID.</span></p>
    
    <p><span>One big difference of using an RDVP instead of the DHT
        network is that both users need to reach the same RDVP node in
        order for peer discovery to work.</span></p>
    
    <p><img alt="" src="/img/blog6-image33.jpg"/></p>
    
    
    
    <h3>Conclusion and a comparison between the
        peer discovery mechanisms</h3>
    <p><span>The main concept to understand is that peer discovery needs
        a sort of “server” that should be reachable by all peers that
        want to discover each other. This “central server” will relay
        the necessary information for the peers to discover each other.
      </span></p>
    
    <p><span>So, what peer discovery method should you use? </span></p>
    
    <table border={1} cellSpacing="0">
      <tbody>
        <tr>
          <td valign="top">
            <p><strong>mDNS</strong></p>
          </td>
          <td valign="top">
            <p><strong>DHT</strong></p>
          </td>
          <td valign="top">
            <p><strong>RDVP</strong></p>
          </td>
        </tr>
        <tr>
          <td valign="top">
            <p><strong>Best peer discovery method for devices on the same
                LAN.</strong></p>
          </td>
          <td valign="top">
            <p><strong>Best used when there is no RDVP node available
                and/or in networks with traffic restrictions.</strong></p>
            <p><span>This peer discovery method relies on the </span><strong>public</strong> IPFS

                  DHT network.</p>
          </td>
          <td valign="top">
            <p><strong>Best used when an RDVP node server is available and
                is easily accessible by each user; when connectivity to
                the RDVP node is not blocked by a firewall.</strong></p>
            <p><span>Can be used when the devices are on different LAN
                networks (they are on different subnets). It uses the
                IPFS libp2p library.</span></p>
          </td>
        </tr>
        <tr>
          <td valign="top">
            <p><strong>PROs:</strong></p>
            <ul>
              <li><span>fast</span></li>
              <li><span>no configuration needed</span></li>
              <li><span>independent of any third party server or network</span></li>
            </ul>
          </td>
          <td valign="top">
            <p><strong>PROs:</strong></p>
            <ul>
              <li><span>highly resilient communication enabled by the
                  decentralized architecture of the public IPFS DHT
                  network</span></li>
              <li><span>works for devices on different networks</span></li>
            </ul>
          </td>
          <td valign="top">
            <p><strong>PROs:</strong></p>
            <ul>
              <li><span>works for devices on different networks</span></li>
              <li><span>fast</span></li>
              <li><span>multiple RDVP nodes can be setup (listed) for
                  increased resiliency</span></li>
              <li><span>users can setup their own RDVP nodes</span></li>
            </ul></td>
        </tr>
        <tr>
          <td valign="top">
            <p><strong>CONs:</strong></p>
            <ul>
              <li><span>only works with mDNS compatible devices on the
                  same LAN</span></li>
              <li><span>needs mDNS enabled on the LAN switch</span></li>
            </ul>
          </td>
          <td valign="top">
            <p><strong>CONs:</strong></p>
            <ul>
              <li><span>slow as it relies fully on the DHT seed node
                  used.</span></li>
              <li><span>users need to know the IP address of the
                  bootstrap (which are the entry points to the public
                  DHT network) they want to connect.</span></li>
              <li><span>users need to reach at least one DHT node.
                  Firewall can be an issue.</span></li>
            </ul>
          </td>
          <td valign="top">
            <p><strong>CONs:</strong></p>
            <ul>
              <li><span>both devices need to reach the </span><strong>same</strong> RDVP
                    node. Firewall can be an issue.</li>
              <li><span>less decentralized than DHT</span></li>
              <li><span>few public RDVP nodes that are not accessible
                  from everywhere</span></li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    
    
    <p><span>Resiliency is increased by not having to rely on a single
        server. Communities can set up their own RDVP node or use the
        public DHT network. And of course, in the more simpler case of a
        LAN network, peer discovery is straightforward using the mDNS
        protocol.</span></p>
    

              
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
          <p>Copyright © 2025 – Berty.Tech non-profit organization</p>
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
