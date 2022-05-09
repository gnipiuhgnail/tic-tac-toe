// X和O分别用不一样的颜色
// 在游戏历史记录列表显示每一步棋的坐标，格式为 (行号, 列号)。
// 在历史记录列表中区别显示当前选择的项目。
// 添加一个可以升序或降序显示历史记录的按钮。
// 每当有人获胜时，高亮将棋子显示连成一线。
import React from "react"
import './Game.css'
function calculateWinner(squares, length, count) {
  const squaresLen = squares.filter( item => item==='X'|| item==='O').length
  if( squaresLen < (count *2 -1)){
    return null
  }else{
    for (let i = 0; i<squares.length; i++) {
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
        const ex0 = length - count + 1
        const ex1 = i % length < ex0
        const ex2 = i / length < ex0
        const ex3 = i > ex0
        if(ex1){
          horizontalArr.winnerIndex.push(i+j)
          horizontalArr.winnerValue.add(x[i+j])
        }
        if(ex2){
          verticalArr.winnerIndex.push(i+j*length)
          verticalArr.winnerValue.add(x[i+j*length])
        }
        if(ex1 && ex2){
          diagonalLowerArr.winnerIndex.push(i+j*(length+1))
          diagonalLowerArr.winnerValue.add(x[i+j*(length+1)])
        }
        if(i-j*(length-1) > 0 && ex1 && i > ex3) {
          diagonalUpperArr.winnerIndex.push(i-j*(length-1))
          diagonalUpperArr.winnerValue.add(x[i-j*(length-1)])
        }
      }
      let result
      if(!(horizontalArr.winnerValue.has(null) || horizontalArr.winnerValue.has(undefined)) && horizontalArr.winnerValue.size === 1 && horizontalArr.winnerIndex.length === count){
        return result = horizontalArr
      } else if(!(verticalArr.winnerValue.has(null) || verticalArr.winnerValue.has(undefined)) && verticalArr.winnerValue.size === 1 && verticalArr.winnerIndex.length === count){
        return result = verticalArr
      } else if(!(diagonalLowerArr.winnerValue.has(null) || diagonalLowerArr.winnerValue.has(undefined)) && diagonalLowerArr.winnerValue.size === 1 && diagonalLowerArr.winnerIndex.length === count){
        return result = diagonalLowerArr
      } else if(!(diagonalUpperArr.winnerValue.has(null) || diagonalUpperArr.winnerValue.has(undefined)) && diagonalUpperArr.winnerValue.size === 1 && diagonalUpperArr.winnerIndex.length === count){
        return result = diagonalUpperArr
      } else if(squaresLen === Math.pow(length,2)){
        return result =  {
          winnerValue: new Set('D'), 
          winnerIndex: [] 
        }
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
  return (<div className="square" style={{color: props.value=='X'?'slateblue':'green',backgroundColor: props.isConnect ? "#ffe680":''}} onClick={props.onClick}>{props.value} </div>)
}
function Board(props) {
  const count = props.count
  let element = []
  for (let i = 0; i < count; i++) {
    const item = []
    for (let j = 0; j < count; j++) {
      const flag = j + i * count
      const connectList = props.connectList ? props.connectList.some(i => i == flag) : ''
      item.push(<Square key={flag} isConnect={connectList} value={props.squares[flag]} onClick={() => props.onClick(flag)} />) // 调用
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
    <div key={item.count}><button className="btn" onClick={() => props.onClick(item.count)}>{item.model}</button></div>
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
    const connectList = result?.winnerIndex
    let isInit = new Set(current.squares);
    let status;
    if(winner){
      status = <div style={{ color: 'crimson' }}>{winner.has('D') ? "Double Win" :('Winner: ' + (winner.has('X') ? 'X' : (winner.has('O') ? 'O' :'')))}</div>
    } else {
      if (isInit.size === 1 && isInit.has(null)) {
        status = <div>please start the game!</div>
      } else {
        const isX = this.state.xIsNext ? 'X' : 'O'
        status = <div><span style={{ color: '#333' }}>Next player: </span> <span style={{ color: isX === 'X' ? 'slateblue': 'green' }}> { isX}</span></div>
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
      const desc = step === 0 ? "go to init: (row,column)" : `go to step ${curStep} : ${coordinate}`
      return (<div key={curStep}><button  disabled={winner ? true : false} className={flag ?'historyListSelBtn btn': 'btn'}  onClick={() => this.jumpTo(curStep)}>{desc}</button></div>)
    })
    return (
      <div className="game-box flexBetween">
        <div className="game-left flexBetween">
          <div style={{width:'20px'}}>切换模式</div>
          <div><SelModel onClick={(i) => this.manageBtn(i)}></SelModel></div>
          </div>
        <div className="game-center">
          <div className="select-box">
            <h2>{status}</h2>
            <p className="flexBetween"><span>当前模式：{this.model}</span><button className="btn" style={{marginLeft:'35px'}} onClick={this.reset}>重新开始</button></p>
            {/* <button>选择棋盘大小<button></button><button></button><button></button></button> */}
          </div>
          <Board count={this.length} squares={current.squares} onClick={(i) => this.handleClick(i)} connectList={connectList}></Board>
        </div>
        <div className="game-right">
          <div className="tip-box">
            <div  className="flexBetween" style={{marginBottom: '10px'}}>历史记录 
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