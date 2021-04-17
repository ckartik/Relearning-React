import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

function calculateWinner(squares) {
  var winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningLines.length; i++) {
    const [a,b,c] = winningLines[i];

    if ( 
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {

        return squares[a];
      }
  }
    return null;
}

class Board extends React.Component {

  renderSquare(i) {
    return <Square 
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
          />;
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{squares: Array(9).fill(null)}],
      xIsNext: true,
    };

  }

  jumpTo(i) {
    let xIsNext = i % 2 == 0 ? true : false;
    const history = this.state.history.slice(0,i+1)
    this.setState({
      xIsNext: xIsNext,
      history: history,
    })
  }
  handleClick(i){
    const history = this.state.history;
    const current = history[history.length-1].squares.slice();
    if (calculateWinner(current) || current[i]){
      return;
    }
    current[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      xIsNext: !this.state.xIsNext,
      history: history.concat([{squares: current}]),
    });
  }

  render() {
    let status;
    const history = this.state.history;
    const current = history[history.length-1].squares.slice();
    const winner = calculateWinner(current);
    if (winner) {
      status = 'Winner is ' + winner + ' Congrats!!'
    } 
    else {
      status = 'Next player: ' + (this.props.xIsNext ? 'X' : 'O')
    }

    const moves = history.map((step, move)=>
    {
      const desc = move ? 'Go to move #' + move  :  'Go to start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      )

    })

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current} onClick={(i) =>  this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

