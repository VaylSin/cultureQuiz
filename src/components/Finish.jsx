import React from 'react';

const Finish = ({ points, totalPoints, highScore, dispatch }) => {
    
    const pourcentage = Math.ceil((points / totalPoints) * 100);
    let icon = pourcentage >= 50 ? '🎉' : '😭';

    return (
        <>
            <p className='result'>
                <span>{icon}</span> Tu as marqué <strong>{points} points</strong> sur {totalPoints} ({pourcentage} %)
            </p>
            <p className="highscore"> ( Plus haut score : {highScore} )</p>
            <button className='btn btn-ui' onClick={() => dispatch({type: "restart"})} >Recommencer</button>

        </>
    );
}

export default Finish;
