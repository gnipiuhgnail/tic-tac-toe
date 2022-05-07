// 使用 ES6 class 语法定义一个组件的时候，通常的做法是将事件处理函数声明为 class 中的方法。
// 需要将方法绑定
//  [性能]如果回调函数作为prop传入子组件时，这些组件可能会进行额外的重新渲染(是之前九宫格重复运行的原因吗)
// 1. 构造器绑定事件方法
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    }
    this.handleClick = this.handleClick.bind(this)  // 为了在回调中使用this
  }
  // 在 JavaScript 中，class 的方法默认不会绑定 this，所以要在构造器中绑定
  handleClick(){
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }))
  }
  render() {
    return (
      <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
    )
  }
}
ReactDOM.render(
  <Toggle/>,
  document.getElementById('root')
)
// 2. 使用class fields语法
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    }
  }
  // class fileds语法
  handleClick = () => {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }))
  }
  render() {
    return (
      <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
    )
  }
}
ReactDOM.render(
  <Toggle/>,
  document.getElementById('root')
)
// 3. 在回调中使用箭头函数

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    }
  }
  // class fileds语法
  handleClick(){
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }))
  }
  render() {
    return (
      <button onClick={(e) => this.handleClick(id, e)}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>,
      <button onClick={this.handleClick.bind(this, id)}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
    )
  }
}