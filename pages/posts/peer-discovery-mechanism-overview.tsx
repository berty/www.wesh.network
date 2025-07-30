import Head from "next/head"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import styles from "../../styles/Home.module.scss"
import React from "react"
import hljs from "highlight.js"

export default function Post() {

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
                              example on how the PeerID is used in Wesh. <br />
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

                <div style={{ textAlign: "center", margin: "20px 0" }}>
                  <img className="img-post" alt="" src="/img/blog6-image22.png" height={400} />
                </div>


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

                <div style={{ textAlign: "center", margin: "20px 0" }}>
                  <img className="img-post" alt="" src="/img/blog6-image11.png" height={400} />
                </div>


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

                <div style={{ textAlign: "center", margin: "20px 0" }}>
                  <img className="img-post" alt="" src="/img/blog6-image33.png" height={400} />
                </div>

                <h3>Conclusion and a comparison between the
                  peer discovery mechanisms</h3>
                <p><span>The main concept to understand is that peer discovery needs
                  a sort of “server” that should be reachable by all peers that
                  want to discover each other. This “central server” will relay
                  the necessary information for the peers to discover each other.
                </span></p>

                <p><span>So, what peer discovery method should you use? </span></p>

                <div style={{ maxWidth: "80vw", overflowX: "auto" }}>
                  <div className="table-container">
                    <table className="comparison-table">
                      <thead>
                        <tr>
                          <th className="method-header">
                            <div className="method-title">mDNS</div>
                            <div className="method-badge local">Local Network</div>
                          </th>
                          <th className="method-header">
                            <div className="method-title">DHT</div>
                            <div className="method-badge distributed">Distributed</div>
                          </th>
                          <th className="method-header">
                            <div className="method-title">RDVP</div>
                            <div className="method-badge server">Server-based</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="description-row">
                          <td><strong>Best peer discovery method for devices on the same LAN.</strong></td>
                          <td>
                            <strong>Best used when there is no RDVP node available and/or in networks with traffic restrictions.</strong>
                            <div className="sub-note">This peer discovery method relies on the public IPFS DHT network.</div>
                          </td>
                          <td>
                            <strong>Best used when an RDVP node server is available and is easily accessible by each user; when connectivity to the RDVP node is not blocked by a firewall.</strong>
                            <div className="sub-note">Works across different subnets via libp2p</div>
                          </td>
                        </tr>
                        <tr className="pros-row">
                          <td>
                            <strong className="pros-header">PROs:</strong>
                            <ul>
                              <li>Fast</li>
                              <li>No configuration needed</li>
                              <li>Independent of any third party server or network</li>
                            </ul>
                          </td>
                          <td>
                            <strong className="pros-header">PROs:</strong>
                            <ul>
                              <li>Highly resilient communication enabled by the decentralized architecture of the public IPFS DHT network</li>
                              <li>Works for devices on different networks</li>
                            </ul>
                          </td>
                          <td>
                            <strong className="pros-header">PROs:</strong>
                            <ul>
                              <li>Works for devices on different networks</li>
                              <li>Fast</li>
                              <li>Multiple RDVP nodes can be setup (listed) for increased resiliency</li>
                              <li>Users can setup their own RDVP nodes</li>
                            </ul>
                          </td>
                        </tr>
                        <tr className="cons-row">
                          <td>
                            <strong className="cons-header">CONs:</strong>
                            <ul>
                              <li>Only works with mDNS compatible devices on the same LAN</li>
                              <li>Needs mDNS enabled on the LAN switch</li>
                            </ul>
                          </td>
                          <td>
                            <strong className="cons-header">CONs:</strong>
                            <ul>
                              <li>Slow as it relies fully on the DHT seed node used.</li>
                              <li>Users need to know the IP address of the bootstrap (entry points to the public DHT network)</li>
                              <li>Users need to reach at least one DHT node. Firewall can be an issue.</li>
                            </ul>
                          </td>
                          <td>
                            <strong className="cons-header">CONs:</strong>
                            <ul>
                              <li>Both devices need to reach the same RDVP node. Firewall can be an issue.</li>
                              <li>Less decentralized than DHT</li>
                              <li>Few public RDVP nodes that are not accessible from everywhere</li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <p><span>Resiliency is increased by not having to rely on a single
                  server. Communities can set up their own RDVP node or use the
                  public DHT network. And of course, in the more simpler case of a
                  LAN network, peer discovery is straightforward using the mDNS
                  protocol.</span></p>

                <p>
                  <i>
                    Posted by Berty Team on 29/07/2025.
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
