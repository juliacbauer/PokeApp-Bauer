import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import useLogout from "../hooks/useLogout";
import { useState } from "react";

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
  const logout = useLogout();
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
      if (res.status !== 200) return
      router.replace(router.pathname + `?q=${query}`)
      setWordData(wordData)
    } catch (error)
    {
      console.error('Error fetching data:', error);
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

      <main className={styles.main}>
        <h1 className={styles.title}>
          This is the Search Page!
        </h1>

        <p className={styles.description}>
        <form onSubmit={handleSubmit} className={styles.form}>
        <label>Welcome to Prose Pal! Search for words!</label>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          type="text"
          name="word-search"/>
        <button type="submit">Submit</button>
      </form>
      {wordData && wordData.length > 0 && (
  <div>
    {wordData.map((word, index) => (
      <div key={index}>
        <h2>{word.word}</h2>
        <p>{word.meanings[0].definitions[0].definition}</p>
      </div>
    ))}
  </div>
)}
    </p>


        <div className={styles.grid}>
          {props.isLoggedIn ? (
            <>
              <Link href="/favorites" className={styles.card}>
                <h2>View Your Favorites! &rarr;</h2>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.card}>
                <h2>Login &rarr;</h2>
                <p>Visit the login page.</p>
              </Link>

              <Link href="/signup" className={styles.card}>
                <h2>Create Account &rarr;</h2>
                <p>Create an account.</p>
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