// 棋盘
import React from 'react';
import Square from '../Square/Square'
import './board.css'
function calculateWinner(squares) {
	// 可以构成直线的位置
	const lines = [
		[0, 1, 2],[3, 4, 5],[6, 7, 8],
		[0, 3, 6],[1, 4, 7],[2, 5, 8],
		[0, 4, 8],[2, 4, 6]
	]
	for(let i = 0; i < lines.length; i++){
		const [a, b, c] = lines[i]
		console.log(lines.length,i,squares[a],squares[b],squares[c])
		if(squares[a] && squares[a] == squares[b] && squares[a] == squares[c]){
			return squares[a]
		}
	}
	return null
}
class Board extends React.Component{
	// 子组件共享数据
	constructor(props) {
		// 在JavaScript class中，每次定义其子类的构造函数时，都需要调用super方法
		super(props); // 在所有含有构造函数的React组件中，构造函数必须以super(props)开头
		// this.state 用于存放组件的数据。
		this.state = { // 初始化state，每个state都是私有的，属于当前组件
			squares: Array(9).fill(null),
			xIsNext: true, // 控制玩家
		}
	}
	handleClick(i) {
		const squares = this.state.squares.slice(); // 创建 square 数组的副本
		// 当有玩家胜出或某个放歌已被填充，不做任何处理
		console.log(calculateWinner(squares))
		if(calculateWinner(squares) || squares[i]){
			return ;
		}
		// React中的不可变性
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		// 改变this.state的值
		// 每次在组件中调用setState时，React都会自动更新其子组件
		this.setState({
			squares: squares,
			xIsNext: !this.state.xIsNext,
		})
	}
	// 创建Square组件的函数
	renderSquare(i) {
		// 将名为value和onPut的prop传递到Square当中 
		return <Square value={this.state.squares[i]} onPut={()=>this.handleClick(i)}/>
	}
	render(){
		const winner = calculateWinner(this.state.squares)
		// const status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
		let status;
		if(winner){
			status = 'Winner' + winner
		}else{
			status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
		}
		return (
			<div>
				<div className="status">{status}</div>
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
export default Board