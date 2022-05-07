#### React 简介
1.React将界面分成了各个独立的小块，每一个块就是组件，这些组件之间可以组合、嵌套、就成了我们的页面
2.高性能体现：virtual DOM机制 ，算法：diff=>Fiber
核心：
	思想：将页面中任何一个区域或元素都可以看作一个组件(同时包含html、css、js、image元素的聚合体)
	内容：数据绑定
	语法：JSX语法(使用xml标记的方式直接声明界面-html和js混写)
	
#### Diff 算法
Diff算法的核心就是扫描DOM树，通过扫描找到DOM树前后的差异。
若DOM树的状态或属性发生改变，React会构建新的DOM树，将新的DOM树和原来的DOM树进行比较，找到树中变化的部分进行修改。
好处是避免重复的频繁的操作DOM，提高页面的访问性能。

#### React语法
##### 渲染函数 ReactDOM.render(渲染源对象,渲染目标对象,回调函数)
##### JSX(JavaScript XML 的缩写)，是JavaScript语法的扩展，React的内置语法

#### 入口文件 index.js

#### HBuilder的插件
[HBuilder插件市场](https://ext.dcloud.net.cn/?cat1=1&cat2=11&page=1)

#### 组件和组件的样式应该放在同一个文件夹下
	或者在组件中定义css

#### 提升状态
- 将子组件共享数据保存在父组件的state中

#### 事件命名规范
- 在 React 中，有一个命名规范，通常会将代表事件的监听 prop 命名为 on[Event]，将处理事件的监听方法命名为 handle[Event] 这样的格式。

#### React中的不可变性
- 改变数据一般有两种方式：1. 直接修改变量的值；2. 使用新的一份数据代替旧的数据(不直接修改或改变底层数据，copy)
- 使用改变数据方式2的好处：
	- 简化复杂功能
		- 可以实现开发中常见的需求：‘时间旅行’。如：‘跳回之前步骤’，‘撤销’，‘恢复’，‘追溯和复用历史记录’
	- 跟踪数据的改变
	- 确定在React中何时重新渲染
		- 帮助在React中创建pure components。轻松确定不可变数据是否发生了改变，从而确定何时对组件进行重新渲染。

#### 函数组件
- 当组件只包含一个render方法并且不包含state，使用函数组件更简单

#### 组件
```
class <组件名> extends React.Component{
	constructor(){
		super(props),
		this.state = {} //数据初始化
	}
	...functions;
	render(){
		return (页面)
	}
}
return <组件名>
```
#### 时间旅行
- 保存历史记录
	- 用一个数组history，保存历史版本：通过slice()函数为每一步创建squares数组的副本，同时把squares当作不可变对象
	- key，检索上一次渲染时与每一个key所匹配的列表项。不存在，则创建一个新的组件，少了，则销毁，变化了，就先销毁再创建。
  - React 会通过 key 来自动判断哪些组件需要更新。组件是不能访问到它的 key 的。
  - 我们强烈推荐，每次只要你构建动态列表的时候，都要指定一个合适的 key。
  