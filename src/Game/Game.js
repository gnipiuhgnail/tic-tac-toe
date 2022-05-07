// 进度：历史记录，回跳
import React from "react"
import './Game.css'
// 棋盘
// 轮流下棋
// 判断谁赢
// 记录进程，并能返回查看
function calculateWinner(squares, length, count) {
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
  let flags = [length - 1, length, length + 1, 1]
  if (arrO.length + arrX.length < count * 2 - 1) {
    return null
  } else {
    if (arrX.length > arrO.length) {
      for (let i = 0; i < arrX.length; i++) {
        let items = []
        let test = []
        let z = i
        // i与所有数相减，找出两个值等于flags内任意一个
        for (let j = 0; j < arrX.length; j++,z++){
          test.push([arrX[z],arrX[j]])
          console.log("test",test)
          items.push(Math.abs(arrX[z] - arrX[j]))
        }
        for(let k = 0; k < flags.length; k++){
          if(items.filter((item)=>item==flags[k]).length == count-1){
            return 'X'
          }
        }
      }
    } else {
      for (let i = 0; i < arrO.length; i++) {
      let items = []
      let z = i
        for (let j = 0; j < arrO.length; j++, z++){
          items.push(Math.abs(arrO[z] - arrO[j]))
        }
        for(let k = 0; k < flags.length; k++){
          if(items.filter((item)=>item==flags[k]).length == count-1 ){
            return 'O'
          }
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
    <button className="btn" key={item.count} onClick={() => props.onClick(item.count)}>{item.model}</button>
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
      count: i
    })
    this.model = i === 3 ? '三连棋' : (i === 4 ? '四连棋' : '五连棋')
    // this.isDisable = true
  }
  jumpTo = (step) => {
    this.setState({
      stepFlag: step,
      xIsNext: step % 2 == 0
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
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      if (isInit.size === 1 && isInit.has(null)) {
        status = 'please start the game!'
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
      }
    }
    console.log('winner',winner)
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