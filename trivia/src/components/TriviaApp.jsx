import React, { useEffect, useState } from "react";

const TriviaApp = () => {
    // State variable to store the list of questions
    const [questions, setQuestions] = useState(null);

    // State variable to store the selected answers for each question
    const [selectedAnswers, setSelectedAnswers] = useState({});

    // Fetch questions from the API when the component mounts
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                // Fetch questions data from the API
                const response = await fetch("https://the-trivia-api.com/v2/questions");
                const data = await response.json();
                // Update the questions state variable with the fetched data
                setQuestions(data);
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
        };
        fetchQuestions();
    }, []);

    // Function to update the selected answer for a question
    const toggleAnswerSelect = (questionId, selectedAnswer) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: selectedAnswer
        });
    };

    // Function to handle showing answer feedback
    const handleShowAnswerFeedback = () => {
        // Iterate through questions and display feedback
        questions.forEach(question => {
            console.log("Question:", question.question.text);
            console.log("Your Answer:", selectedAnswers[question.id]);
            console.log("Correct Answer:", question.correctAnswer);
        });
    };

    return (
        <form>
            <h1>Trivia App</h1>
            {/* Render questions and answer options */}
            {questions && questions.map((question, index) => (
                <div key={index} className="question-box">
                    <p>{question.question.text}</p>
                    {/* For improved user experience, randomize the answers through unordered list */}
                    <ul>
                        {/* Render incorrect answer options */}
                        {question.incorrectAnswers.map((incorrectAnswer, i) => (
                            <li key={i}>
                                <label>
                                    <input
                                        type="radio"
                                        name={`question${index}`}
                                        value={incorrectAnswer}
                                        checked={selectedAnswers[question.id] === incorrectAnswer}
                                        onChange={() => toggleAnswerSelect(question.id, incorrectAnswer)}
                                    />
                                    {incorrectAnswer}
                                </label>
                            </li>
                        ))}
                        {/* Render correct answer option */}
                        <li>
                            <label>
                                <input
                                    type="radio"
                                    name={`question${index}`}
                                    value={question.correctAnswer}
                                    checked={selectedAnswers[question.id] === question.correctAnswer}
                                    onChange={() => toggleAnswerSelect(question.id, question.correctAnswer)}
                                />
                                {question.correctAnswer}
                            </label>
                        </li>
                    </ul>
                </div>
            ))}
            {/* Button to submit answers and show feedback */}
            <button type="button" onClick={handleShowAnswerFeedback}>Submit Answers</button>
        </form>
    );
};

export default TriviaApp;
