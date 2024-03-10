import { useState } from "react";

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [points, setPoints] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(
      Number.prototype.valueOf,
      0
    )
  );
  const [selected, setSelected] = useState(0);
  const [highestVote, setHighestVote] = useState(null);

  const handleRandomClick = () => {
    const randomAnecdote = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomAnecdote);
  };
  
  const handleVoteClick = () => {
    const copy = [...points];
    copy[selected] += 1;
    const maxVote = copy.indexOf(Math.max(...copy))
    
    setPoints(copy);
    setHighestVote(maxVote)
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button text="vote" onClick={handleVoteClick} />
      <Button text="next anecdote" onClick={handleRandomClick} />
      <br />
      <h1>Anecdote with most votes</h1>
      {highestVote === null ? (
        <p>No votes yet</p>
      ) : (
        <>
          <p>{anecdotes[highestVote]}</p>
          <p>has {points[highestVote]} votes</p>
        </>
      )}
    </div>
  );
}

export default App;
