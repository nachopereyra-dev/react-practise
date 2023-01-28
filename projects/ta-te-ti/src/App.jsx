import React from "react";
import { useState } from "react";
import confetti from 'canvas-confetti'
import { Square } from "./components/Square";
import { turns } from './constants'
import { checkWinnerFrom, checkEndGame } from './logic/board'
import { WinnerModal } from './components/WinnerModal'
import { saveGameToStorage, resetGameStorage } from './logic/storage/index'


function App() {

    // const [board, setBoard] = useState(Array(9).fill(null))

    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board')
        return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    })

    const [turn, setTurn] = useState(() => {
        const turnfromStorage = window.localStorage.getItem('turn')
        return turnfromStorage ?? turns.x
    })

    const [winner, setWinner] = useState(null) // null es que no hay ganador, y false es empate

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(turns.x)
        setWinner(null)

        resetGameStorage()
    }

    const updateBoard = (index) => {

        // Verificamos si la casilla ya fue usada (por defecto viene en null)

        if (board[index] || winner) return

        // Actualizamos el board

        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        // Cambiamos el turno

        const newTurn = turn === turns.x ? turns.o : turns.x
        setTurn(newTurn)

        // Guardar partida

        saveGameToStorage({
            board: newBoard,
            turn: newTurn
        })
        
        // Revisamos si hay ganador

        const newWinner = checkWinnerFrom(newBoard)
        if (newWinner) {
            confetti()
            setWinner(newWinner)
        } else if (checkEndGame(newBoard)) {
            setWinner(false) // empate
        }
    }

    return (
        <main className="board">
            <h1>Ta-te-ti</h1>
            <button onClick={resetGame}>Empezar de nuevo</button>
            <section className="game">
                {
                    board.map((square, index) => {
                        return (
                            <Square 
                                key={index}
                                index={index}
                                updateBoard={updateBoard}
                            >
                                {square}
                            </Square>
                        )
                    })
                }
            </section>

            <section className="turn">
                <Square isSelected={ turn === turns.x}>{turns.x}</Square>
                <Square isSelected={ turn === turns.o}>{turns.o}</Square>
            </section>
            
            <WinnerModal  resetGame={resetGame} winner={winner} />
        </main>
        )
}

export default App