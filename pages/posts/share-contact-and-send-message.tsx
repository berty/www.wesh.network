import Head from "next/head"
import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import styles from "../../styles/Home.module.scss"
import React from "react"
import hljs from "highlight.js"
import content from "./content.json"

export default function Post() {
  const posts = content.items.find((i) => i.id === "4")

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
                <h2>Wesh App: Share Contact and Send Message</h2>
                <p>
                  We continue to use the Wesh API to build more capable apps. In the <a href="https://wesh.network/posts/wesh-app-with-persistent-storage">previous blog post</a>,
                  we made an example app which creates an account using persistent on-disk storage, and we discussed the types of information in Wesh. This includes a Contact group
                  where two user accounts can communicate. In this blog post we will make an example app to share contact and send a message in the Contact group. (This is a longer
                  blog post because we’re building a running app.)
                </p>
                <p>
                  As before, we write an app similar to the <a href="https://go.dev/doc/tutorial/getting-started">Go tutorial</a>. In a terminal enter:
                </p>
                <pre>
                  <code className="language-bash">
                    {`cd
mkdir contact
cd contact
`}
                  </code>
                  <code className="language-go">go mod init example/contact</code>
                </pre>
                <h3>The main function</h3>
                <p>
                  In your text editor, create a file <code>contact.go</code> in which to write your code. Paste the following code into your <code>contact.go</code> file.
                </p>
                <pre>
                  <code className="language-go">
                    {`package main

import (
	"context"
	"fmt"
	"io"
	"os"
	"time"

	"berty.tech/weshnet"
	"berty.tech/weshnet/pkg/protocoltypes"
	"github.com/mr-tron/base58"
  )`}
                  </code>
                </pre>
                <p>
                  (See the <a href="https://wesh.network/posts/wesh-hello-world-app">first example app blog post</a> for explanation.) To continue the example, paste the following
                  main function.
                </p>
                <pre>
                  <code className="language-go">
                    {`func main() {

	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	client1, err := weshnet.NewPersistentServiceClient("data1")
	if err != nil {
		panic(err)
	}
	defer client1.Close()

	// client1 shares contact with client2.
	binaryContact, err := client1.ShareContact(ctx,
		&protocoltypes.ShareContact_Request{})
	if err != nil {
		panic(err)
	}
	fmt.Println(base58.Encode(binaryContact.EncodedContact))

	// client1 receives the contact request from client2.
	request, err := receiveContactRequest(ctx, client1)
	if err != nil {
		panic(err)
	}
	if request == nil {
		fmt.Println("Error: Did not receive the contact request")
		return
	}

	// client1 accepts the contact request from client2.
	_, err = client1.ContactRequestAccept(ctx,
		&protocoltypes.ContactRequestAccept_Request{
			ContactPK: request.ContactPK,
		})
	if err != nil {
		panic(err)
	}

	// Activate the contact group.
	groupInfo, err := client1.GroupInfo(ctx, &protocoltypes.GroupInfo_Request{
		ContactPK: request.ContactPK,
	})
	if err != nil {
		panic(err)
	}
	_, err = client1.ActivateGroup(ctx, &protocoltypes.ActivateGroup_Request{
		GroupPK: groupInfo.Group.PublicKey,
	})
	if err != nil {
		panic(err)
	}

	// Receive a message from the group.
	message, err := receiveMessage(ctx, client1, groupInfo)
	if err != nil {
		panic(err)
	}
	if message == nil {
		fmt.Print("End of stream without receiving message")
		return
	}

	fmt.Println("client2:", string(message.Message))
}
`}
                  </code>
                </pre>
                <p>
                  This uses some helper functions which we will define below. As in the previous example, we call <code>NewPersistentServiceClient(&quot;data1&quot;)</code> to
                  create a client with persistent storage on-disk. We name the folder “data1” because this is client1. It will communicate with client2 which we create below.
                </p>
                <p>
                  Next we call the Wesh API function <code>ShareContact</code> which is{" "}
                  <a href="https://buf.build/berty/weshnet/docs/main:weshnet.protocol.v1#weshnet.protocol.v1.ProtocolService.ShareContact">documented here</a>. It returns an
                  encoded byte array with the information that client2 needs to make a contact request. We use <code>base58.Encode</code> to make it a shareable string and print it
                  to the console. (The Wesh API leaves it up to the application developer to decide how to encode the byte array. You may use base58, or make a QR code, or a URI,
                  etc.) This string is used by client2, as we will see.
                </p>
                <p>
                  Let’s imagine that client2 has sent the contact request, so we call <code>receiveContactRequest</code> which we will define below. It returns <code>request</code>{" "}
                  which has the account public key of client2, so we call <code>ContactRequestAccept</code> (
                  <a href="https://buf.build/berty/weshnet/docs/main:weshnet.protocol.v1#weshnet.protocol.v1.ProtocolService.ContactRequestAccept">docs</a>) to accept the contact
                  request and create the Contact group.
                </p>
                <p>
                  Now we need to activate this group. We use the same account public key of client2 to identify the Contact group and call <code>GroupInfo</code> (
                  <a href="https://buf.build/berty/weshnet/docs/main:weshnet.protocol.v1#weshnet.protocol.v1.ProtocolService.GroupInfo">docs</a>) to get the group’s public key, and
                  then call <code>ActivateGroup</code> (
                  <a href="https://buf.build/berty/weshnet/docs/main:weshnet.protocol.v1#weshnet.protocol.v1.ProtocolService.ActivateGroup">docs</a>) to activate it.
                </p>
                <p>
                  Finally, let’s imagine that client2 has sent a message to the group, so we call <code>receiveMessage</code> which we will define below. This returns the message
                  (or nil if end of stream) which we print to the console.
                </p>
                <h3>Helper functions</h3>
                <p>
                  That’s it for main! Now we need to define the helper functions <code>receiveContactRequest</code> and <code>receiveMessage</code>. These both follow the pattern
                  of subscribing to an event stream and waiting for the desired event type. Paste the following function to the file <code>contact.go</code>.
                </p>
                <pre>
                  <code className="language-go">
                    {`
	func receiveContactRequest(ctx context.Context, client weshnet.ServiceClient) (*protocoltypes.AccountContactRequestIncomingReceived, error) {
		// Get the client's AccountGroupPK from the configuration.
		config, err := client.ServiceGetConfiguration(ctx,
			&protocoltypes.ServiceGetConfiguration_Request{})
		if err != nil {
			return nil, err
		}

		// Subscribe to metadata events. ("sub" means "subscription".)
		subCtx, subCancel := context.WithCancel(ctx)
		defer subCancel()
		subMetadata, err := client.GroupMetadataList(subCtx,
			&protocoltypes.GroupMetadataList_Request{
				GroupPK: config.AccountGroupPK,
			})
		if err != nil {
			return nil, err
		}

		for {
			metadata, err := subMetadata.Recv()
			if err == io.EOF || subMetadata.Context().Err() != nil {
				// Not received.
				return nil, nil
			}
			if err != nil {
				return nil, err
			}

			if metadata == nil || metadata.Metadata.EventType !=
					protocoltypes.EventTypeAccountContactRequestIncomingReceived {
				continue
			}

			request := &protocoltypes.AccountContactRequestIncomingReceived{}
			if err = request.Unmarshal(metadata.Event); err != nil {
				return nil, err
			}

			return request, nil
		}
	}
`}
                  </code>
                </pre>
                <p>
                  This function takes the client1 which we created in <code>main</code> and calls <code>ServiceGetConfiguration</code> (
                  <a href="https://buf.build/berty/weshnet/docs/main:weshnet.protocol.v1#weshnet.protocol.v1.ProtocolService.ServiceGetConfiguration">docs</a>). Instead of getting
                  the configuration’s peer ID as in previous examples, we get the public key of client1’s Account group. This public key is also in the shared contact, and is used
                  by client2 to send a contact request to client1. To receive it, we call <code>GroupMetadataList</code> (
                  <a href="https://buf.build/berty/weshnet/docs/main:weshnet.protocol.v1#weshnet.protocol.v1.ProtocolService.GroupMetadataList">docs</a>) with the Account group
                  public key.
                </p>
                <p>
                  Most API functions return a data structure, but a few like <code>GroupMetadataList</code> return a subscription stream like <code>subMetadata</code>. We use a{" "}
                  <code>for</code> loop and call <code>subMetadata.Recv()</code> which blocks until it receives an event (or end of stream). As you build more complex apps, an
                  event loop like this may handle more event types and operations. For now, we just check that the event type is the one we’re waiting for,{" "}
                  <code>EventTypeAccountContactRequestIncomingReceived</code>.
                </p>
                <p>
                  Now we can use <code>Unmarshal</code> to convert the <code>metadata</code> event to the specific <code>AccountContactRequestIncomingReceived</code> event. (
                  <code>Unmarshal</code> is part of the Protobuf interface. For more details,{" "}
                  <a href="https://pkg.go.dev/github.com/golang/protobuf/proto#Unmarshal">see the docs</a>). This is the contact <code>request</code> that we return from the
                  function.
                </p>
                <p>
                  Now we need to define <code>receiveMessage</code> which waits for the message. Paste the following function to the file <code>contact.go</code>. (This one is
                  shorter!)
                </p>
                <pre>
                  <code className="language-go">
                    {`func receiveMessage(ctx context.Context, client weshnet.ServiceClient, groupInfo *protocoltypes.GroupInfo_Reply) (*protocoltypes.GroupMessageEvent, error) {
	// Subscribe to message events.
	subCtx, subCancel := context.WithCancel(ctx)
	defer subCancel()
	subMessages, err := client.GroupMessageList(subCtx, &protocoltypes.GroupMessageList_Request{
		GroupPK: groupInfo.Group.PublicKey,
	})
	if err != nil {
		panic(err)
	}

	// client waits to receive the message.
	for {
		message, err := subMessages.Recv()
		if err == io.EOF {
			// Not received.
			return nil, nil
		}
		if err != nil {
			return nil, err
		}

		return message, nil
	}
}
                    `}
                  </code>
                </pre>
                <p>
                  Similar to the previous function, this function takes the client1 which we created in <code>main</code> . It also takes the <code>groupInfo</code> object of the
                  Contact group. (The <code>main</code> function already used this to activate the group.)
                </p>
                <p>
                  As in the previous function, we want to subscribe to events. In the <a href="https://wesh.network/posts/wesh-app-with-persistent-storage">previous blog post</a>,
                  we briefly discussed the difference between the Metadata log and the Message log. A contact request is an event in the Metadata log, so{" "}
                  <code>receiveContactRequest</code> called <code>GroupMetadataList</code> . But now we want to receive a “normal” message when it is added to the Message log.
                </p>
                <p>
                  We call the API method <code>GroupMessageList</code> (
                  <a href="https://buf.build/berty/weshnet/docs/main:weshnet.protocol.v1#weshnet.protocol.v1.ProtocolService.GroupMessageList">docs</a>) which returns the
                  subscription stream <code>subMessages</code>. We use a <code>for</code> loop and call <code>subMetadata.Recv()</code> which blocks until it receives an event (or
                  end of stream). Finally, the function returns <code>message</code> which is a <code>GroupMessageEvent</code> so that the main function can print the message from
                  client2.
                </p>
                <h3>Client 2</h3>
                <p>
                  Wait a moment (you may be thinking). We don’t have the code where client2 sends the message. We will add it to this same file and you will run the app in two
                  terminals. Remember that the code for client1 prints the contact string to the terminal. When we run the app for client2, we’ll add this string as a command-line
                  parameter. At the very beginning of the main function, insert this code:
                </p>
                <pre>
                  <code className="language-go">
                    {`if len(os.Args) == 2 {
	doClient2(os.Args[1])
	return
}
`}
                  </code>
                </pre>
                <p>
                  Now we can define the function <code>doClient2</code> which is called if we run using the contact string. Paste the following function to the file{" "}
                  <code>contact.go</code> and save it.
                </p>
                <pre>
                  <code className="language-go">
                    {`func doClient2(encodedContact string) {
	ctx, cancel := context.WithCancel(context.Background())
	defer cancel()

	client2, err := weshnet.NewPersistentServiceClient("data2")
	if err != nil {
		panic(err)
	}
	defer client2.Close()

	contactBinary, err := base58.Decode(encodedContact)
	if err != nil {
		panic(err)
	}
	contact, err := client2.DecodeContact(ctx,
		&protocoltypes.DecodeContact_Request{
			EncodedContact: contactBinary,
		})
	if err != nil {
		panic(err)
	}

	// Send the contact request.
	_, err = client2.ContactRequestSend(ctx,
		&protocoltypes.ContactRequestSend_Request{
			Contact: contact.Contact,
		})
	if err != nil {
		panic(err)
	}

	// Activate the contact group.
	groupInfo, err := client2.GroupInfo(ctx, &protocoltypes.GroupInfo_Request{
		ContactPK: contact.Contact.PK,
	})
	if err != nil {
		panic(err)
	}
	_, err = client2.ActivateGroup(ctx, &protocoltypes.ActivateGroup_Request{
		GroupPK: groupInfo.Group.PublicKey,
	})
	if err != nil {
		panic(err)
	}

	// Send a message to the contact group.
	_, err = client2.AppMessageSend(ctx, &protocoltypes.AppMessageSend_Request{
		GroupPK: groupInfo.Group.PublicKey,
		Payload: []byte("Hello"),
	})
	if err != nil {
		panic(err)
	}

	fmt.Println("Sending message...")
	time.Sleep(time.Second * 5)
}
`}
                  </code>
                </pre>
                <p>
                  This function takes the <code>encodedContact</code> from the command line. It runs as a separate process, so we need to use{" "}
                  <code>NewPersistentServiceClient</code> to create a separate client2 with persistent data stored in a separate folder, “data2”.
                </p>
                <p>
                  Next we use <code>base58.Decode</code> to recover the encoded byte array with client1’s contact info, and use <code>DecodeContact</code> (
                  <a href="https://buf.build/berty/weshnet/docs/main:weshnet.protocol.v1#weshnet.protocol.v1.ProtocolService.DecodeContact">docs</a>) to extract the{" "}
                  <code>contact</code> info. Now client2 can call <code>ContactRequestSend</code> (
                  <a href="https://buf.build/berty/weshnet/docs/main:weshnet.protocol.v1#weshnet.protocol.v1.ProtocolService.ContactRequestSend">docs</a>) to send this to client1
                  as a contact request. You may be thinking, “client1 just sent this info to client2, so why does client2 need to send it back?” This is part of the secure
                  handshake. client2 needs to make sure that the shared contact really came from client1, and needs to decide if creating a contact is actually desired.
                </p>
                <p>
                  Similar to the code above, client2 needs to activate the Contact group using <code>GroupInfo</code> and <code>ActivateGroup</code> . (In this case, client2 has
                  client1’s account public key from the shared contact in <code>contact.Contact.PK</code> .)
                </p>
                <p>
                  We’re almost done! Client2 calls <code>AppMessageSend</code> (
                  <a href="https://buf.build/berty/weshnet/docs/main:weshnet.protocol.v1#weshnet.protocol.v1.ProtocolService.AppMessageSend">docs</a>) to use the Contact group
                  public key to send a “Hello” message to the Contact group. (For generality, a message is any byte array. In this case we simply store the message string in it.)
                  For efficiency, the <code>AppMessageSend</code> function queues the message to be sent and returns immediately. If we exit the application too soon, then the Wesh
                  services won’t have time to actually send the message. Therefore, we sleep this function for 5 seconds so that the service threads can complete.
                </p>
                <h3>Run the app</h3>
                <p>That’s all the code! It’s time to run the app. In a terminal enter:</p>
                <pre>
                  <code className="language-go">
                    {`
go mod tidy
go run .
                    `}
                  </code>
                </pre>
                <p>
                  (You only need to do <code>go mod tidy</code> the first time.) It should print the contact string from client1, something like
                  <code>2KqzJQpZ2Y7EDaep6CnceT6ozqy1Ss6qJV8tsN59QSBejfa4TiYjMr8Z9PjHr1D2bYa4EozWudwaWMwB5jXqb5gRLj2bX</code>. Copy this to the clipboard.
                </p>
                <p>Leave this app running. Now, in a separate terminal we run as client2. cd to the same directory and enter:</p>
                <pre>
                  <code className="language-go">{"go run . <contact-string> "}</code>
                </pre>
                <p>
                  where <code>{"<contact-string>"}</code> is the contact string from client1. It should print <code>Sending message...</code>. Now look at the terminal for client1.
                  It should print <code>client2: Hello</code> .
                </p>
                <p>
                  You have established Wesh communication! You can use this example app as a basis for more sophisticated Wesh apps. Overall, this simply creates a Contact group
                  and calls <code>AppMessageSend</code>. But you may understand that Wesh communicates differently than using a traditional network connection. How does the message
                  actually get from client2 to client1? In the next blog post, we’ll do a theory dive into how Wesh’s asynchronous communication works.
                </p>
                <p>
                  <i>
                    Posted by {posts?.author} on {posts?.pubDate}
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
