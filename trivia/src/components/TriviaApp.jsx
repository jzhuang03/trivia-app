import React, { useEffect, useState } from "react";

const TriviaApp = () => {
    const [questions, setQuestions] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
    const [answerFeedback, setAnswerFeedback] = useState({});

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await fetch("https://the-trivia-api.com/v2/questions");
            const data = await response.json();
            // Initialize selectedAnswers state with empty values for each question
            const initialSelectedAnswers = {};
            data.forEach(question => {
                initialSelectedAnswers[question.id] = null;
            });
            setSelectedAnswers(initialSelectedAnswers);
            setQuestions(data);
        };
        fetchQuestions();
    }, []);

    // Handler function to toggle selected answer for a question
    const toggleAnswerSelect = (questionId, answer) => {
        setSelectedAnswers(prevState => ({
            ...prevState,
            [questionId]: prevState[questionId] === answer ? null : answer,
        }));
    };

    // Handler function to display answer feedback
    const handleShowAnswerFeedback = () => {
        setShowAnswerFeedback(true);
        // Check answers and provide feedback
        const feedback = {};
        questions.forEach(question => {
            feedback[question.id] = selectedAnswers[question.id] === question.correctAnswer ? 'correct' : 'wrong';
        });
        setAnswerFeedback(feedback);
    };

    return (
        <form>
            <h1>Trivia App</h1>
            {questions && questions.map((question, index) => (
                <div key={index} className="question-box">
                    <p>{question.question.text}</p>
                    <ul>
                        {/* Display answer options as radio buttons within a list */}
                        {question.incorrectAnswers.map((incorrectAnswer, i) => (
                            <li key={i}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`question${index}`} // Ensure each question has a unique name
                                        value={incorrectAnswer}
                                        checked={selectedAnswers[question.id] === incorrectAnswer}
                                        onChange={() => toggleAnswerSelect(question.id, incorrectAnswer)}
                                    />
                                    {/* Apply 'wrong' class if answer is incorrect and feedback is shown */}
                                    <span className={showAnswerFeedback && selectedAnswers[question.id] === incorrectAnswer && answerFeedback[question.id] === 'wrong' ? 'wrong' : ''}>
                                        {incorrectAnswer}
                                    </span>
                                </label>
                            </li>
                        ))}
                        {/* Display correct answer as a radio button */}
                        <li>
                            <label>
                                <input
                                    type="radio"
                                    name={`question${index}`} // Ensure each question has a unique name
                                    value={question.correctAnswer}
                                    checked={selectedAnswers[question.id] === question.correctAnswer}
                                    onChange={() => toggleAnswerSelect(question.id, question.correctAnswer)}
                                />
                                {/* Apply 'correct' class if answer is correct and feedback is shown */}
                                <span className={showAnswerFeedback && selectedAnswers[question.id] === question.correctAnswer && answerFeedback[question.id] === 'correct' ? 'correct' : ''}>
                                    {question.correctAnswer}
                                </span>
                            </label>
                        </li>
                    </ul>
                </div>
            ))}
            {/* Button to show answer feedback */}
            <button type="button" onClick={handleShowAnswerFeedback}>Submit Answers</button>
        </form>
    );
};

export default TriviaApp;
