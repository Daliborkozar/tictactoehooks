import React, { useState } from 'react'
import Board from './Board'
import {calculateWinner} from '../helper'

const Game = () => {
    const [history, setHistory] = useState([Array(9).fill(null)])
    const [stepNumber, setStepNumber] = useState(0)
    const [xIsNext, setXisNext] = useState(true)
    const winner = calculateWinner(history[stepNumber])
    const xO = xIsNext ? 'X' : '0'

    const handleClick = (i) => {
        const historyPoint = history.slice(0, stepNumber + 1)
        const current = historyPoint[stepNumber]
        const squares = [...current]

        //ako ima winner ili je zauzet square return(nista)
        if(winner || squares[i]) return

        //selektovanje square
        squares[i] = xO
        setHistory([...historyPoint, squares])
        setStepNumber(historyPoint.length)
        setXisNext(!xIsNext)
    }

    const jumpTo = (step) => {
        setStepNumber(step)
        setXisNext(step % 2 === 0)
    }

    const renderMoves = () => 
        history.map((_step, move) => {
            const destination = move ? `Go to move ${move}` : "Go to start"
            return (
                <li key={move}>
                    <button onClick={() => jumpTo(move)}>{destination}</button>
                </li>
            )
        }
        )
    
    return (
        <div>
            <h1>React Tic Tact Toe with hooks</h1>
            <Board squares={history[stepNumber]} onClick={handleClick}/>
            <div className='info-wrapper'>
                <div>
                <h3>History</h3>
                {renderMoves()}
                </div>
                <h3>{winner ? "Winner:" + winner : "Next Player:" + xO}</h3>
            </div>
            
        </div>
    )
}

export default Game
