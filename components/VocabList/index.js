import styles from "./style.module.css";
import { useState } from "react";
import { useRouter } from "next/router";

export default function VocabList({ vocabList }) {
  const [showMore, setShowMore] = useState({});
  const router = useRouter();
  const handleShowMore = (wordId) => {
    setShowMore(prevState => ({
      ...prevState,
      [wordId]: !prevState[wordId]
    }));
  }
  //delete word from vocab list
  async function removeWord(wordId) {
    console.log("Removing word with ID:", wordId);
    const res = await fetch('/api/word', {
      method: 'DELETE',
      body: JSON.stringify({ id: wordId })
    })
    if (res.status === 200) {
      router.replace(router.asPath)
    }
  }

  return (
    <div className={styles.wordInfo}>
      {vocabList.map((word) => (
        <div key={word._id}>
          <h2 style={{ textTransform: 'capitalize' }}>{word.word}</h2>
          {!showMore[word._id] && (
            <button className={styles.button}
              onClick={() => handleShowMore(word._id)}>
              Read More</button>
          )}
          {showMore[word._id] && (
            <div>
              <ul>
                {word.meanings.map((meaning, index) => (
                  <li key={index}>
                    <p>Part of Speech: {meaning.partOfSpeech}</p>
                    <p>Definitions:</p>
                    <ul>
                      {meaning.definitions.map((definition, index) => (
                        <li key={index} className={styles.listPoints}>{JSON.stringify(definition.definition)}</li>
                      ))}
                    </ul>
                    {meaning.synonyms.length > 0 && (
                      <p>Synonyms: {meaning.synonyms.join(', ')}</p>
                    )}
                    {meaning.antonyms.length > 0 && (
                      <p>Antonyms: {meaning.antonyms.join(', ')}</p>
                    )}
                  </li>
                ))}
              </ul>
              <button className={styles.button}
                onClick={() => handleShowMore(word._id)}>
                Show Less
              </button>
            </div>
          )}
          <button className={styles.button}
            onClick={() => removeWord(word._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}