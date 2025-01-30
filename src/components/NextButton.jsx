import React from 'react';

const NextButton = ({ index, dispatch, answer, numQuestions }) => {
    if(answer === null) return null;

    if( index < numQuestions - 1 ) return (
        <div className='btn btn-ui' onClick={() => dispatch({ type: "next" })}>
            Suivant
        </div>
    );
    if( index === numQuestions - 1 ) return (
        <div className='btn btn-ui' onClick={() => dispatch({ type: "finish" })}>
            Fini !
        </div>
    );
}

export default NextButton;
