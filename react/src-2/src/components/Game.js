import React, { useState } from "react";
import './Game.css';

const Game = () => {
    const [playerVal, setPlayerVal] = useState(null);
    const [computerVal, setComputerVal] = useState(null);
    const [playerScore, setPlayerScore] = useState(0);
    const [compScore, setCompScore] = useState(0);

    const logic = (playerVal, computerVal) => {
        if (playerVal === computerVal) {
            return 0;
        } else if (
            (playerVal === "Kő" && computerVal === "Olló") ||
            (playerVal === "Olló" && computerVal === "Papír") ||
            (playerVal === "Papír" && computerVal === "Kő")
        ) {
            return 1;
        } else {
            return -1;
        }
    };

    const decision = (playerChoice) => {
        const choices = ["Kő", "Papír", "Olló"];
        const compChoice = choices[Math.floor(Math.random() * choices.length)];
        const val = logic(playerChoice, compChoice);

        if (val === 1) {
            setPlayerVal(playerChoice);
            setComputerVal(compChoice);
            setPlayerScore(prevScore => prevScore + 1);
        } else if (val === -1) {
            setPlayerVal(playerChoice);
            setComputerVal(compChoice);
            setCompScore(prevScore => prevScore + 1);
        } else {
            setPlayerVal(playerChoice);
            setComputerVal(compChoice);
        }
    };

    const resetGame = () => {
        setPlayerVal(null);
        setComputerVal(null);
        setPlayerScore(0);
        setCompScore(0);
    };

    return (
        <div>
            <h1>Játsszunk Kő, Papír, Ollót!</h1>
            <div>
                <button onClick={() => decision("Kő")}>
                    <i className={`fas fa-hand-rock`} /> Kő
                </button>
                <button onClick={() => decision("Papír")}>
                    <i className={`fas fa-hand-paper`} /> Papír
                </button>
                <button onClick={() => decision("Olló")}>
                    <i className={`fas fa-hand-scissors`} /> Olló
                </button>
            </div>
            <div className="content">
                <h2 className="Jatekos">A te választásod: {playerVal}</h2>
                <h2 className="Gep">A gép választása: {computerVal}</h2>
                <h2 className="Jatekos">Pontjaid: {playerScore}</h2>
                <h2 className="Gep">A gép pontjai: {compScore}</h2>
            </div>
            <div>
                <button onClick={resetGame}>Új játék</button>
            </div>
            <div className="footer">
                Halász Izabella Mária - D97E6X
                Papp Zoltán E5IZMS
            </div>
        </div>
    );
};

export default Game;

