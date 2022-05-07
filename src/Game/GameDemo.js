// 官网Demo
import './GameDemo.css'
import React from 'react';
// 一、生成棋子
function Square(props){
	return (
	// 触发Board 当中onPut的值： handleClick(i) 方法。
	<div className="square" onClick={props.onClick}>{props.value}</div>
	)
}
// 可以构成直线的位置
function calculateWinner(squares) {
	const lines = [
		[0, 1, 2],[3, 4, 5],[6, 7, 8],
		[0, 3, 6],[1, 4, 7],[2, 5, 8],
		[0, 4, 8],[2, 4, 6]
	]
	for(let i = 0; i < lines.length; i++){
		const [a, b, c] = lines[i]
		if(squares[a] && squares[a] == squares[b] && squares[a] == squares[c]){
			return squares[a]
		}
	}
	return null
}
// 二、九宫格盘
class Board extends React.Component{
	// 创建Square组件的函数
	renderSquare(i) {
		// 将名为value和onPut的prop传递到Square组件当中 
		return <Square value={this.props.squares[i]} onClick ={()=>this.props.onClick(i)}/>
	}
	render(){
		return (
			<div>
				<div className="board-box">
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
			</div>
		)
	}
}
// 三、游戏
class Game extends React.Component {
	constructor(props) {
		// 在JavaScript class中，每次定义其子类的构造函数时，都需要调用super方法
		super(props); // 在所有含有构造函数的React组件中，构造函数必须以super(props)开头
		// this.state 用于存放组件的数据。
		this.state = { // 初始化state，每个state都是私有的，属于当前组件
			history: [{squares: Array(9).fill(null)}], // 每一步的记录
			xIsNext: true, // 控制玩家
      stepNumber: 0, // 当前正在哪一步
		}
	}
	handleClick(i){
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if(calculateWinner(squares) || squares[i]){
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares
			}]),
			xIsNext: !this.state.xIsNext,
      stepNumber: history.length
		})
	}
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2 ) == 0
    })
  }
	render(){
		const history = this.state.history;  // 每一步历史
		const current = history[this.state.stepNumber]; // 渲染当前(历史)一步
		const winner = calculateWinner(current.squares); // 判断赢家
		const moves = history.map((step, move) =>{ // 生成记录
			const desc = move ? 'Go to move step' + move : 'Go to game start';
			return (
			<li key={move}><button onClick={()=>this.jumpTo(move)}>{desc}</button></li>
			)
		})
		let status;
		if(winner){
			status = 'Winner:' + winner
		}else {
			status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O')
		}
		return (
			<div className="game">
        {/* current.squares：传入当前历史棋盘的样式 */}
				<div className="game-board"><Board squares={current.squares} onClick={(i)=> this.handleClick(i)}/></div>
				<div className="game-info">
					<div className="status">{status}</div>
					<ol>{moves}</ol>
				</div>
			</div>
		)
	}
}
export default Game
// 有一个问题，为啥会执行两次