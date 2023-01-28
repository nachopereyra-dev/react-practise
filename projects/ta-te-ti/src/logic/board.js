import { winner_combos } from "../constants"

export const checkWinnerFrom = (boardToCheck) => {
    for (const combo of winner_combos) {
        const [a ,b, c] = combo
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
            ) {
                return boardToCheck[a]
            }
    }
    return null
}

export const checkEndGame = (newBoard) => {
    // Revisamos si hay un empate
    // si no hay más espacios vacios
    // en el tablero
    return newBoard.every((square) => square != null)
}