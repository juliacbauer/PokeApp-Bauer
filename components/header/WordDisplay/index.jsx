export default function WordDisplay({ word }) {
    return (
      <div key={word.id}>
        <h2>{word.word}</h2>
        <ul>
          {word.meanings.map((meaning, index) => (
            <li key={index}>{meaning.definition}</li>
          ))}
        </ul>
      </div>
    );
  }