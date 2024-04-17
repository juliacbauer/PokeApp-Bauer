import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import { useState } from "react";
import WordDisplay from "../components/WordDisplay";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    const props = {};
    if (user) {
      props.user = req.session.user;
      props.isLoggedIn = true;
    } else {
      props.isLoggedIn = false;
    }
    return { props };
  },
  sessionOptions
);

export default function Search(props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [wordData, setWordData] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return
    try {
    const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${query}`
      )
      const wordData = await res.json()
      console.log(wordData)
      if (res.status === 404) {
      setWordData(null);
    } else if (res.status == 200){ 
      setWordData(wordData[0])
    }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

//onclick button function for add to vocab
async function addToVocab(e) {
  e.preventDefault()
  //console logging displayed word search data onclick
    const res = await fetch('/api/word', {
      method:'POST',
      headers: {
        "content-type": "application/json"
      }, 
      body: JSON.stringify(wordData[0])
    })
    if (res.status === 200) {
      router.replace(router.asPath)
      console.log("Word added to vocabulary:", wordData)
    }
}

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isLoggedIn={props.isLoggedIn} username={props?.user?.username} />

      <main className={styles.searchPage}>
        <h1 className={styles.title}>
          Word Search
        </h1>
        <br />
        <p className={styles.searchDescription}>
          Search for words to add to your vocabulary list!
        </p>

        <br />

        <form onSubmit={handleSubmit} className={styles.form}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          type="text"
          name="word-search"/>
          <br />
        <button type="submit">Submit</button>
      </form>

      <br />

      {wordData !== null ? (
        <div>
          <WordDisplay word={wordData}/>
          <div className={styles.buttonContainer}>
            <button onClick={addToVocab} 
            className={styles.otherButtons}>Add to Vocabulary</button>
          </div>
        </div>
        ) : (
          <div className={styles.wordSearchInfo}>No words found.</div>
        )}

        <br />
        <br />

        <div className={styles.grid}>
          {props.isLoggedIn ? (
            <>
              <Link href="/vocabulary" className={styles.homeButtons}>
                <h2>My Vocab &rarr;</h2>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.homeButtons}>
                <h2>Login &rarr;</h2>
              </Link>

              <Link href="/signup" className={styles.homeButtons}>
                <h2>Create Account &rarr;</h2>
              </Link>
            </>
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}