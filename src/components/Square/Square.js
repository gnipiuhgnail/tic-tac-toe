import React from "react"
import './square.css'
// 格子按钮
// class Square extends React.Component{
// 	// 在JavaScript class中，每次定义其子类的构造函数时，都需要调用super方法
// 	// constructor(props) { // 在所有含有构造函数的React组件中，构造函数必须以super(props)开头
// 	// 	super(props); 
// 	// 	this.state = { // 初始化state
// 	// 		value: null
// 	// 	}
// 	// }
// 	render(){
// 		return (
// 		// 接受父组件传来的名为value的prop
// 			// <button className="square" onClick={()=>console.log('click')}>{this.props.value}</button>
// 		// 当按钮被点击时，this.setState通知React去重新渲染Square组件
// 		// 每次在组件中调用setState时，React都会自动更新其子组件
// 			// <span className="square" onClick={()=>this.setState({value: 'X'})}>{this.state.value}</span>
// 		// this.props接收父组件传来的参数：属性 和 方法
// 			<span className="square" onClick={()=>this.props.onClick({value: 'X'})}>{this.props.value}</span>
// 		)
// 	}
// }
// 当组件只包含render方法，写成函数组件更好
function Square(props){
	return (
	// 触发Board 当中onPut的值： handleClick(i) 方法。
	<div className="square" onClick={props.onPut}>{props.value}</div>
	)
}
export default Square