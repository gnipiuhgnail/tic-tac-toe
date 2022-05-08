// 在游戏历史记录列表显示每一步棋的坐标，格式为 (列号, 行号)。
// 在历史记录列表中加粗显示当前选择的项目。
// 使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）。
// 添加一个可以升序或降序显示历史记录的按钮。
// 每当有人获胜时，高亮显示连成一线的 3 颗棋子。
import React from "react"
import './Game.css'
function calculateWinner(squares, length, count) {
  const squaresLen = squares.filter( item => item==='X'|| item==='O').length
  if( squaresLen < (count *2 -1)){
    return null
  }else{
    for (let i = 0; i<squares.length; i++) {
      const x = squares
      let horizontalArr = []
      let verticalArr = []
      let diagonalArr = []
      for (let j = 0; j < count; j++) {
        horizontalArr.push(x[i+j])
        verticalArr.push(x[i+j*length])
        diagonalArr.push(x[i+j*(length+1)])
      }
      if((horizontalArr.length === count && horizontalArr.every(item => item === 'X')) || (verticalArr.length === count && verticalArr.every(item => item === 'X') )|| (diagonalArr.length === count && diagonalArr.every(item => item === 'X'))){
        return 'X'
      } else if((horizontalArr.length === count && horizontalArr.every(item => item === 'O')) || (verticalArr.length === count && verticalArr.every(item => item === 'O') )|| (diagonalArr.length === count && diagonalArr.every(item => item === 'O'))){
        return 'O'
      } else if(squaresLen === Math.pow(length,2)){
        return 'D'
      }
    }
  }
  
}
function Square(props) {
  return (<div className="square" onClick={props.onClick}>{props.value}</div>)
}
function Board(props) {
  const count = props.count
  let element = []
  for (let i = 0; i < count; i++) {
    const item = []
    for (let j = 0; j < count; j++) {
      const flag = j + i * count
      item.push(<Square key={flag} value={props.squares[flag]} onClick={() => props.onClick(flag)} />) // 调用
    }
    element.push(<div className="tr-box" key={i}>{item}</div>)
  }
  return (
    <div>{element}</div>
  )
}
function SelModel(props) {
  let modelArr = [
    { model: '三连棋', count: 3, isSel: false },
    { model: '四连棋', count: 4, isSel: false },
    { model: '五连棋', count: 5, isSel: false },
  ]
  const element = modelArr.map((item) =>
    <button className="btn" key={item.count} onClick={() => props.onClick(item.count)}>{item.model}</button>
  )
  return (element)
}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.length = 5 // 表格长度
    this.model = "三连棋"
    this.isDisable = false
    this.state = {
      history: [{ squares: Array(Math.pow(3, 2)).fill(null) }],
      xIsNext: true,
      count: 3, // 几连棋子
      stepFlag: 0,
    }
  }
  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepFlag + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(current.squares, this.length, this.state.count) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{
        squares
      }]),
      xIsNext: !this.state.xIsNext,
      stepFlag: history.length
    })
  }
  manageBtn = (i) => {
    this.setState({
      history: [{ squares: Array(Math.pow(3, 2)).fill(null) }],
      xIsNext: true,
      count: i,
      stepFlag: 0
    })
    this.model = i === 3 ? '三连棋' : (i === 4 ? '四连棋' : '五连棋')
    // this.isDisable = true
  }
  jumpTo = (step) => {
    this.setState({
      stepFlag: step,
      xIsNext: step % 2 === 0
    })
  }
  reset = () => {
    const count = this.state.count
    this.setState({
      history: [{ squares: Array(Math.pow(3, 2)).fill(null) }],
      xIsNext: true,
      count: count,
      stepFlag: 0
    })
  }
  render() {
    const history = this.state.history
    const current = history[this.state.stepFlag]
    const winner = calculateWinner(current.squares, this.length, this.state.count)
    let isInit = new Set(current.squares);
    let status;
    if (winner === 'D') {
      status = "Double Win"
    } else if(winner){
      status = 'Winner: ' + winner
    } else {
      if (isInit.size === 1 && isInit.has(null)) {
        status = 'please start the game!'
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
      }
    }
    let moves = history.map((item, step) => {
      const desc = step === 0 ? "go to init" : `go to step ${step}`
      return (<div key={step}><button className="btn" onClick={() => this.jumpTo(step)} disabled={winner ? true : false}>{desc}</button></div>)
    })
    return (
      <div className="game-box">
        <div className="game-left">
          <div className="select-box">
            <h2 style={{ color: '#fbc847' }}>{status}</h2>
            <p>当前模式：{this.model}</p>
            切换模式：<SelModel onClick={(i) => this.manageBtn(i)}></SelModel>
            {/* <button>选择棋盘大小<button></button><button></button><button></button></button> */}
            <button className="btn" onClick={this.reset}>重置</button>
          </div>
          <Board count={this.length} squares={current.squares} onClick={(i) => this.handleClick(i)}></Board>
        </div>
        <div className="game-right">
          <div className="tip-box">
            <div>历史记录</div>
            <div>{moves}</div>
          </div>
        </div>

      </div>
    )
  }
}
export default Game