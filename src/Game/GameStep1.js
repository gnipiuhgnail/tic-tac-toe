// 能够判定玩家何时获胜
// 能够记录游戏进程
// 使用两个循环来渲染出棋盘的格子，而不是在代码里写死（hardcode）。
import React from "react"
import './Game.css'
function calculateWinner(squares, count) {
  const arrX = []
  const arrO = []
  squares.map((item, index) => {
    if (item === 'O') {
      arrO.push(index)
    } else if (item === 'X') {
      arrX.push(index)
    }
  })
  arrO.sort((a, b) => a - b)
  arrX.sort((a, b) => a - b)
  if (arrO.length + arrX.length < count * 2 - 1) {
    return null
  } else {
    let stop = ''
    // 排序后，四个数之间的差同时等于length/length-1/length+1/1
    if (arrX.length > arrO.length) {
      for (let i = 0; i < arrX.length - 1; i++) {
        const itemX = []
        for (let c = 0; c < count - 1; c++) {
          itemX.push(arrX[c + 1] - arrX[c])
        }
        if ((new Set(itemX)).size === 1) {
          stop = 'X'
          return stop
        }
      }
    } else {
      for (let i = 0; i < arrO.length; i++) {
        const itemO = []
        for (let c = 0; c < count - 1; c++) {
          itemO.push(arrO[c + 1] - arrO[c])
        }
        if ((new Set(itemO)).size === 1) {
          stop = 'O'
          return stop
        }
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
    <button className="modelBtn" key={item.count} onClick={() => props.onClick(item.count)}>{item.model}</button>
  )
  return (element)
}
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.length = 10 // 表格长度
    this.model = "三连棋"
    this.isDisable = false
    this.state = {
      history: [{ squares: Array(Math.pow(3, 2)).fill(null) }],
      xIsNext: true,
      count: 3 // 几字棋子
    }
  }
  handleClick = (i) => {
    const history = this.state.history.slice()
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(current.squares, this.state.count) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: this.state.history.concat([{
        squares
      }]),
      xIsNext: !this.state.xIsNext
    })
  }
  manageBtn = (i) => {
    this.setState({
      history: [{ squares: Array(Math.pow(3, 2)).fill(null) }],
      xIsNext: true,
      count: i
    })
    this.model = i === 3 ? '三连棋' : (i === 4 ? '四连棋' : '五连棋')
    // this.isDisable = true
  }
  reset = () => {
    const count = this.state.count
    this.setState({
      history: [{ squares: Array(Math.pow(3, 2)).fill(null) }],
      xIsNext: true,
      count: count
    })
  }
  render() {
    const history = this.state.history
    const current = history[history.length - 1]
    const winner = calculateWinner(current.squares, this.state.count)
    let isInit = new Set(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      if(isInit.size === 1 && isInit.has(null)){
        status = 'please start the game!'
      }else{
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
      }
    }
    return (
      <div className="game-box">
        <div className="game-left">
          <div className="select-box">
            <h2 style={{color: '#fbc847'}}>{status}</h2>
            <p>当前模式：{this.model}</p>
            切换模式：<SelModel onClick={(i) => this.manageBtn(i)}></SelModel>
            {/* <button>选择棋盘大小<button></button><button></button><button></button></button> */}
            <button className="modelBtn" onClick={this.reset}>重新开始</button>
          </div>
          <Board count={this.length} squares={current.squares} onClick={(i) => this.handleClick(i)}></Board>
        </div>
        <div className="game-right">
          <div className="tip-box">
            <div>历史记录</div>
          </div>
        </div>

      </div>
    )
  }
}
export default Game