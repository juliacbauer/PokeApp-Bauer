import { useState } from 'react';
import styles from "./style.module.css";

export default function WordDisplay({ word }) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className={styles.wordInfo} key={word.id}>
      <ul>
        <li> {/*figure out how to map using ol?*/}
          <h2 style={{ textTransform: 'capitalize' }}>{word.word}</h2>
        </li>
      </ul>
      {!showMore && (
        <button className={styles.button} onClick={() => setShowMore(true)}>Show More</button>
      )}
      {showMore && (
        <div>
          <ul>
            {word.meanings.map((meaning, index) => (
              <li key={index}>
                <p>Part of Speech: {meaning.partOfSpeech}</p>
                <h3>Definitions:</h3>
                <ul className={styles.listPoints}>
                  {meaning.definitions.map((definition, index) => (
                    <li key={index}>{JSON.stringify(definition.definition)}</li>
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
          <br />
          <button className={styles.button} onClick={() => setShowMore(false)}>Show Less</button>
        </div>
      )}
    </div>
  );
}