import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { withIronSessionSsr } from "iron-session/next";
import sessionOptions from "../config/session";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import useLogout from "../hooks/useLogout";
//import db from "../db";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    //const vocabulary = await db.word.getVocab(user.id)
    const props = {};
    if (user) {
      props.user = req.session.user;
      props.isLoggedIn = true;
    } else {
      props.isLoggedIn = false;
    }
    return {
        props //: {
        //user: req.session.user,
        //isLoggedIn: true,
        //vocabularyList: vocab,
      //}
    };
  },
  sessionOptions
);

//add async onclick button function for delete from vocab...?

export default function Vocabulary(props) {
  const router = useRouter();
  const logout = useLogout();
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
          My Vocabulary
        </h1>

        <br />
        <br />

        {/*props.vocabularyList.length > 0 ? <VocabList vocab={props.vocabularyList} /> : 
        //delete button in here some where? mapped with each word?
        <p>No words in vocabulary list</p>*/}
        
        <div className={styles.grid}>
          {props.isLoggedIn ? (
            <>
              <Link href="/search" className={styles.homeButtons}>
                <h2>Word Search &rarr;</h2>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className={styles.homeButtons}>
                <h2>Login &rarr;</h2>
                <p>Visit the login page.</p>
              </Link>

              <Link href="/signup" className={styles.homeButtons}>
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
