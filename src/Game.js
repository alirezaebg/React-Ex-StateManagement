import React, { Component } from 'react';

class Game extends Component {

    constructor(props) {
        super(props);
        const valuesArray = this.makeNewQuestion();
        this.state = {
            value1: valuesArray[0],
            value2: valuesArray[1],
            value3: valuesArray[2],
            proposedAnswer: valuesArray[3],
            correctAnswer: 0,
            numQuestions: 0,
        };
    }

    makeNewQuestion = () => {
        const value1 = Math.floor(Math.random() * 100);
        const value2 = Math.floor(Math.random() * 100);
        const value3 = Math.floor(Math.random() * 100);
        const proposedAnswer = Math.floor(Math.random() * 3) + (value1 + value2 + value3);
        return [value1, value2, value3, proposedAnswer];
    };

    handleAnswer = event => {
        const newValuesArray = this.makeNewQuestion();
        this.updateState(newValuesArray);
        const answerWasCorrect = this.evaluateAnswer(event.target.name);
        this.handleResult(answerWasCorrect);
    };

    updateState = newValuesArray => {
        this.setState(currState => ({
            value1: newValuesArray[0],
            value2: newValuesArray[1],
            value3: newValuesArray[2],
            proposedAnswer: newValuesArray[3],
        }));
    };

    handleResult = answerWasCorrect => {
        if (answerWasCorrect) {
            this.setState(currState => ({
                correctAnswer: currState.correctAnswer + 1,
            }));
        }
        this.setState(currState => ({
            numQuestions: currState.numQuestions + 1,
        }));
    };

    evaluateAnswer(givenAnswer) {
        const { value1, value2, value3, proposedAnswer } = this.state;
        const corrAnswer = value1 + value2 + value3;

        return (
            (corrAnswer === proposedAnswer && givenAnswer === 'true') ||
            (corrAnswer !== proposedAnswer && givenAnswer === 'false')
        );
    }

    render() {
        const { value1, value2, value3, proposedAnswer, correctAnswer, numQuestions } = this.state;
        return (
            <div>
                <div className="equation">
                    <p className="text">{`${value1} + ${value2} + ${value3} = ${proposedAnswer}`}</p>
                </div>
                <button onClick={this.handleAnswer} name="true">
                    True
                </button>
                <button onClick={this.handleAnswer} name="false" >
                    False
                </button>
                <p className="text">
                    Your Score: {correctAnswer}/{numQuestions}
                </p>
            </div>
        );
    }

}

export default Game;
