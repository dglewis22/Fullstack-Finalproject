import React, { useState, useEffect } from 'react';

function Home({ handleLogout }) {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5004/api/topics')
      .then((response) => response.json())
      .then((data) => {
        setTopics(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching topics:', error);
        setLoading(false);
      });
  }, []);

  const handleTopicClick = (topicId) => {
    setSelectedTopic(topicId);
    setLoading(true);

    fetch(`http://localhost:5004/api/questions/${topicId}`)
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
        setLoading(false);
      });
  };

  return (
    <div className="home-container">
      {/* Top Navbar with App Title */}
      <nav className="navbar">
        <div className="navbar-title">Quiz Quest!</div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </nav>

      <div className="content">
        <div className="sidebar">
          <ul>
            {loading ? (
              <li>Loading topics...</li>
            ) : (
              topics.map((topic) => (
                <li key={topic.id}>
                  <button onClick={() => handleTopicClick(topic.id)}>{topic.name}</button>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="main-content">
          {loading ? (
            <p>Loading questions...</p>
          ) : selectedTopic ? (
            <>
              <h2>Questions for {topics.find((topic) => topic.id === selectedTopic)?.name}</h2>
              <ul>
                {questions.map((question) => (
                  <li key={question.id}>
                    <h3>{question.question}</h3>
                    <p>{question.answer}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p>Select a topic to see the questions.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
