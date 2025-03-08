import React, { useState } from 'react';
import './App.css';

// Card Component that displays question and answer
function Card({ question, answer, showAnswer, image,difficulty }) {
  return (
    <div className="card">
      <h3>{question}</h3>
      {/* Only show the image if answer is not shown */}
      {!showAnswer && image && <img src={image} alt="Logo" className="logo" />}
      {showAnswer && <p className="answer">{answer}</p>}
    </div>
  );
}


// App Component with logic for displaying cards and showing answers
function App() {
  const triviaCards = [
    // Logo-based Questions (first 5)
    {
      question: "What programming language has this logo?",
      answer: "Python",
      image: "public/Screenshot 2025-03-07 174913.png", // Example image path for Python logo
      difficulty: "easy"
    },
    {
      question: "What programming language has this logo?",
      answer: "Golang",
      image: "public/Screenshot 2025-03-07 175429.png", // Example image path for JavaScript logo
      difficulty: "difficult"
    },
    {
      question: "What programming language has this logo?",
      answer: "Java",
      image: "public/Screenshot 2025-03-07 175228.png", // Example image path for Java logo
      difficulty: "easy"
    },
    {
      question: "What programming language has this logo?",
      answer: "Ruby",
      image: "public/Screenshot 2025-03-07 175021.png", // Example image path for Ruby logo
      difficulty: "easy"
    },
  
    // Regular Trivia Questions (remaining cards)
    { question: "Who created Python?", answer: "Guido van Rossum", difficulty: "hard" },
    { question: "When was JavaScript released?", answer: "1995", difficulty: "hard" },
    { question: "Which language is known for its snake logo?", answer: "Python", difficulty: "easy" },
    { question: "What year was C programming created?", answer: "1972", difficulty: "hard" },
    { question: "Which language was developed by James Gosling?", answer: "Java", difficulty: "hard" },
    { question: "What is the most popular programming language?", answer: "JavaScript", difficulty: "easy" },
    { question: "What is the first programming language?", answer: "Fortran", difficulty: "hard" },
    { question: "Who invented C++?", answer: "Bjarne Stroustrup", difficulty: "hard" },
    { question: "In which year was C# created?", answer: "2000", difficulty: "hard" },
    { question: "When was Ruby on Rails released?", answer: "2004", difficulty: "hard" },
  ];
  

  // State to handle the current card index and visibility of the answer
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hovered, setHovered] = useState(false); // Add hovered state

  // Function to show the next card in order (with wrap around to first card)
  const showNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % triviaCards.length); // Wrap around to first card when reaching the last card
    setShowAnswer(false); // Hide answer initially when going to the next card
  };

  // Function to show the previous card (with wrap around to last card)
  const showPreviousCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + triviaCards.length) % triviaCards.length); // Wrap around to last card when going before the first card
    setShowAnswer(false); // Hide answer when going to the previous card
  };

  // Toggle visibility of the answer
  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const currentCard = triviaCards[currentCardIndex];
  // Set the background color of the card container based on difficulty
  const containerStyle = {
    backgroundColor: hovered
      ? (currentCard.difficulty === "easy" ? "#66cc66" : "#ff6666") // Lighter color on hover
      : (currentCard.difficulty === "easy" ? "black" : "black"), // Default background color
    transition: "background-color 0.3s ease-in-out", // Smooth transition for background color change
  };
  return (
    <div className="App">
      <header className="header">
        <h1>Programming Languages Trivia</h1>
        <p>Test your knowledge of programming languages!</p>
        {/* Card Counter */}
        <p><strong>Card: {currentCardIndex + 1} / {triviaCards.length}</strong></p> {/* Display current card number out of total */}
      </header>

      {/* Card Container */}
      <div className="card-container" style={containerStyle} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {/* Single Card Display */}
        <section className="card-section">
          <Card
            question={currentCard.question}
            answer={currentCard.answer}
            showAnswer={showAnswer}
            image={currentCard.image} // Pass the image prop to the Card component
            difficulty={currentCard.difficulty}
            containerStyle={containerStyle}
          />
        </section>

        {/* Buttons */}
        <div className="buttons">
          <button onClick={showPreviousCard}>Previous Card</button>
          <button onClick={toggleAnswer}>
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>
          <button onClick={showNextCard}>Next Card</button>
        </div>
      </div>
      <p style={{ fontSize: '1.5rem', textAlign: 'center' }}>
        <strong>Total Cards: </strong>{triviaCards.length}
      </p>
    </div>
  );
}

export default App;
