import React from "react"

class Shopping extends React.Component{
	render(){
		// JSX 写法
		// return (
		// 	<div className="shopping-list">
		// 		<h1>Shopping List for {this.props.className}</h1>
		// 		<ul>
		// 			<li>Instagram</li>
		// 			<li>WhatApp</li>
		// 			<li>Oculus</li>
		// 		</ul>
		// 	</div>
		// )
		// 等价于React.createElement
		return React.createElement('div',
		{className: 'shopping-list'},
		React.createElement('h1', null, "Shopping List for"),
		React.createElement('ul', null, React.createElement('li', null,"Instagram"), React.createElement('li', null,"WhatApp"), React.createElement('li', null,"Oculus"))
		)
	}
}
export default Shopping