import styles from "./style.module.css";

export default function WordDisplay({ word }) {

  return (
    <div className={styles.wordInfo} key={word.id}>
          <h2 style={{ textTransform: 'capitalize' }}>{word.word}</h2>
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
        </div>
    </div>
  );
}