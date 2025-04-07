import React, {Component} from "react";
import './Game.css';

class Game extends Component{
    constructor(props) {
        super(props)
        this.state = {
            playerVal : null,
            computerVal : null,
            playerScore: 0,
            compScore: 0,
            
        };
    }
    logic = (playerVal, computerVal)=>{
        if(playerVal == computerVal){
            return 0;
        } else if ((playerVal == "Kő" && computerVal == "Olló") ||
            (playerVal == "Olló" && computerVal == "Papír") ||
            (playerVal == "Papír" && computerVal == "Kő")
        ) {
            return 1;
        } else {
            return -1;
        }
    }

    decision = (playerChoice)=> {
        const choices = ["Kő", "Papír", "Olló"];
        const compChoice =  choices[Math.floor(Math.random() * choices.length)];
        const val = this.logic(playerChoice, compChoice)
        if(val == 1) {
            console.log("Hello")
            this.setState({
                playerVal: playerChoice,
                computerVal : compChoice, 
                playerScore : this.state.playerScore +1
            })
        } else if(val == -1) {
            console.log("Hello")
            this.setState({
                playerVal: playerChoice,
                computerVal : compChoice,
                compScore : this.state.compScore +1
            })
        } else {
            console.log("Hello")
            this.setState({
                computerVal : compChoice,
                playerVal : playerChoice
            })
        }

        
    }
    render(){
        const {playerVal, computerVal, playerScore, compScore} = this.state;
        return(
            <div>
                <h1>Játsszunk Kő, Papír, Ollót!</h1>
                    <div>
                        <button onClick={()=>this.decision("Kő")}>
                            <i className={`fas fa-hand-rock`} /> Kő
                        </button>
                        <button onClick={()=>this.decision("Papír")}>
                            <i className={`fas fa-hand-paper`} /> Papír
                        </button>
                        <button onClick={()=>this.decision("Olló")}>
                            <i className={`fas fa-hand-scissors`} /> Olló
                        </button>
                    </div>
                    <div className="content">
                        <h2 className="Jatekos">A te válsztásod: {playerVal}</h2>
                        <h2 className="Gep">A gép választása: {computerVal}</h2>
                        <h2 className="Jatekos">Pontjaid:{playerScore}</h2>
                        <h2 className="Gep">A gép pontjai: {compScore}</h2>
                    </div>

                   
			        
			        <div className="footer">
				        Készítették: Halász Izabella Mária - D97E6X

			        </div>
                    </div>

        )
    }
}

export default Game;

