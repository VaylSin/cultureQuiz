import React from 'react';

const StartScreen = ({numQuestions, dispatch}) => {
    return (
        <div className='start'>
            <h2>Bienvenue au SKDigit Quiz</h2>
            <h3>{numQuestions} questions pour se tester</h3>
            <button className='btn btn-ui' onClick={() => dispatch({type: "start"})} >Commencer</button>
        </div>
    );
}

export default StartScreen;
