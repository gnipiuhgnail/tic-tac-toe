// X和O分别用不一样的颜色
// 在游戏历史记录列表显示每一步棋的坐标，格式为 (行号, 列号)。
// 在历史记录列表中区别显示当前选择的项目。
// 添加一个可以升序或降序显示历史记录的按钮。
// 每当有人获胜时，高亮将棋子显示连成一线。
import React from "react"
import './Game.css'
function calculateWinner(squares, length, count) {
  console.log("11111111",length,count)
  const squaresLen = squares.filter( item => item==='X'|| item==='O').length
  if( squaresLen < (count *2 -1)){
    return null
  }else{
    for (let i = 0; i<squares.length; i++) {
      console.log("s",squares)
      const x = squares
      let horizontalArr = {
        winnerValue: new Set(), // 每个位置的值
        winnerIndex: []  // 每个位置的索引
      }
      let verticalArr = {
        winnerValue: new Set(),
        winnerIndex: []  
      }
      let diagonalUpperArr = {
        winnerValue: new Set(),
        winnerIndex: []  
      }
      let diagonalLowerArr= {
        winnerValue: new Set(),
        winnerIndex: []  
      }
      for (let j = 0; j < count; j++) {
        // 获取水平线的
        console.log(":::::",i%length, length-count-1, length*(length-count-1)-1)
        if((i%length) <(length-count-1)){
          horizontalArr.winnerIndex.push(i+j)
          horizontalArr.winnerValue.add(x[i+j])
        }
        if(i<length*(length-count-1)-1){
          verticalArr.winnerIndex.push(i+j*length)
          verticalArr.winnerValue.add(x[i+j*length])
        }
        if(i<length*(length-count-1)-1 && (i%length) <(length-count-1)){
          diagonalLowerArr.winnerIndex.push(i+j*(length+1))
          diagonalLowerArr.winnerValue.add(x[i+j*(length+1)])
        }
        if(i-j*(length-1) > 0 && (i%length) <(length-count-1) && i > length *(length-count-1)-1) {
          diagonalUpperArr.winnerIndex.push(i-j*(length-1))
          diagonalUpperArr.winnerValue.add(x[i-j*(length-1)])
        }
        console.log(i,[i+j,i+j*length,i+j*(length+1),i-j*(length-1)])
      }
      console.log(horizontalArr.winnerIndex)
      console.log(verticalArr.winnerIndex)
      console.log(diagonalLowerArr.winnerIndex)
      console.log(diagonalUpperArr.winnerIndex)
      let result
      if(!(horizontalArr.winnerValue.has(null) || horizontalArr.winnerValue.has(undefined)) && horizontalArr.winnerValue.size === 1 && horizontalArr.winnerIndex.length === count){
        result = horizontalArr
      }
      else if(!(verticalArr.winnerValue.has(null) || verticalArr.winnerValue.has(undefined)) && verticalArr.winnerValue.size === 1 && verticalArr.winnerIndex.length === count){
        result = verticalArr
      }
      else if(!(diagonalLowerArr.winnerValue.has(null) || diagonalLowerArr.winnerValue.has(undefined)) && diagonalLowerArr.winnerValue.size === 1 && diagonalLowerArr.winnerIndex.length === count){
        result = diagonalLowerArr
      }
      else if(!(diagonalUpperArr.winnerValue.has(null) || diagonalUpperArr.winnerValue.has(undefined)) && diagonalUpperArr.winnerValue.size === 1 && diagonalUpperArr.winnerIndex.length === count){
        result = diagonalUpperArr
      }
      console.log("res" , result)
      if(result){
        return result
      }else if(squaresLen === Math.pow(length,2)){
        return {winner:'D',winerList:[]}
      }



      // for (let j = 0; j < count; j++) {
      //   horizontalArr.push(x[i+j])
      //   verticalArr.push(x[i+j*length])
      //   diagonalUpperArr.push(x[i-j*(length-1)])
      //   diagonalLowerArr.push(x[i+j*(length+1)])
      // }
      // if((horizontalArr.length === count && horizontalArr.every(item => item === 'X')) || (verticalArr.length === count && verticalArr.every(item => item === 'X') )||
      // (diagonalUpperArr.length === count && diagonalUpperArr.every(item => item === 'X')) || (diagonalLowerArr.length === count && diagonalLowerArr.every(item => item === 'X') )
      // ){
      //   return 'X'
      // } else if((horizontalArr.length === count && horizontalArr.every(item => item === 'O')) || (verticalArr.length === count && verticalArr.every(item => item === 'O') )|| 
      // (diagonalUpperArr.length === count && diagonalUpperArr.every(item => item === 'O')) || (diagonalLowerArr.length === count && diagonalLowerArr.every(item => item === 'O') )
      // ){
      //   return 'O'
      // } else if(squaresLen === Math.pow(length,2)){
      //   return 'D'
      // }
    }
  }
  
}
function Square(props) {
  return (<div className="square" style={{color: props.value=='X'?'slateblue':'crimson'}} onClick={props.onClick}>{props.value}</div>)
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
      history: [{ 
        squares: Array(Math.pow(3, 2)).fill(null),
        coordinate: []
      }],
      xIsNext: true,
      count: 3, // 几连棋子
      stepFlag: 0,
      order: 'asc'
    }
  }
  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepFlag + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(current.squares, this.length, this.state.count)|| squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    const currentI = i + 1
    const coordinate = current.coordinate.slice()
    coordinate[i] = `(${Math.floor(currentI/this.length)+1},${currentI%this.length})`
    this.setState({
      history: history.concat([{
        squares,
        coordinate
      }]),
      xIsNext: !this.state.xIsNext,
      stepFlag: history.length,
    })
  }
  manageBtn = (i) => {
    this.setState({
      history: [{ squares: Array(Math.pow(3, 2)).fill(null),coordinate: []}],
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
      xIsNext: step % 2 === 0,
    })
  }
  reset = () => {
    const count = this.state.count
    this.setState({
      history: [{ squares: Array(Math.pow(3, 2)).fill(null),coordinate:[]}],
      xIsNext: true,
      count: count,
      stepFlag: 0
    })
  }
  render() {
    const history = this.state.history
    const current = history[this.state.stepFlag]
    const result = calculateWinner(current.squares, this.length, this.state.count)
    const winner = result?.winnerValue
    console.log('winner',winner)
    let isInit = new Set(current.squares);
    let status;
    if (winner === 'D') {
      status = "Double Win"
    } else if(winner){
      status = 'Winner: ' + (winner.has('X') ? 'X' : 'O')
    } else {
      if (isInit.size === 1 && isInit.has(null)) {
        status = 'please start the game!'
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
      }
    }
    let stepFlag = this.state.stepFlag
    let rehistory = this.state.history.slice(1)
    rehistory.reverse()
    rehistory.unshift(this.state.history[0])
    let order = this.state.order
    let moves = (order == 'asc'?history:rehistory).map((item, step) => {
      const coordinate = item.coordinate.filter(item => item).join('、')
      const curStep = order == 'asc' ? step : ( step == 0 ? 0 : Math.abs(history.length - step) )
      const flag = stepFlag == curStep
      const desc = step === 0 ? "go to init: (row,column)" : `go to step ${step} : ${coordinate}`
      return (<div key={curStep}><button  disabled={winner ? true : false} className={flag ?'historyListSelBtn btn': 'btn'}  onClick={() => this.jumpTo(curStep)}>{desc}</button></div>)
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
            <div style={{display:'flex',justifyContent: 'space-between'}}>历史记录 
              <div>
                <div className="order" onClick={() => this.setState({
                  order:'asc'
                })}>⬆</div>
                <div className="order" onClick={() => this.setState({
                  order:'desc'
                })}>⬇</div></div>
              </div>
            <div>{moves}</div>
          </div>
        </div>

      </div>
    )
  }
}
export default Game