import styles from "./styles.module.css";

export default function WordDisplay({ word }) {
    return (
      <div className={styles.wordInfo} key={word.id}>
        <h2>{word.word}</h2>
        <ul>
        {word.meanings.map((meaning, index) => (
          <li key={index}>
            <p>Part of Speech: {meaning.partOfSpeech}</p>
            <p>Definitions:</p>
            <ul>
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
      </div>
    );
  }