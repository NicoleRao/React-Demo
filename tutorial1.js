var CommentBox = React.createClass({
    render: function () {
        return (
            <div className="commentBox">
                Hello, world! I am a {this.props.name}.
            </div>
        );
    }
});

// 使用{变量名}作为属性值
var nameDiv = [
    <div>nameDiv1:Alice</div>,
    <div>nameDiv2:Bob</div>,
    <div>nameDiv3:Joe</div>
];

// use array in jsx
var names = ['Alice', 'Bob', 'Joe'];
var NameList = React.createClass({
    render: function () {
        return (<ul> {
            names.map(function (name) {
                return (<li>hello {name}!</li>);
            })
        }</ul>);
    }
});

// this.props.children
var NodeList = React.createClass({
    render: function () {
        return (<ol>
            {
                React.Children.map(this.props.children, function (child) {
                    return <li>{child}</li>;
                })
            }
        </ol>);
    }
});

// this.refs
var MyComponent = React.createClass({
    getInitialState() {
        return {value: 'controlled input'};
    },
    handleClick: function () {
        this.refs.myTextInput.focus();
        this.setState({value: 'value changed'});
    },
    componentDidMount() {
        console.log(React.findDOMNode(this.refs.myTextInput));
    },
    render: function () {
        return (
            <div>
                <input type="text" ref="myTextInput" value={this.state.value}/><br />
                <input type="text" value="Click me" onClick={this.handleClick}/>
            </div>
        );
    }
});

// this.state
var LikeButton = React.createClass({
    getInitialState: function () {
        return {liked: false};
    },
    handleClick: function () {
        this.setState({liked: !this.state.liked});
    },
    render: function () {
        var text = this.state.liked ? 'like' : 'not like';
        return (<p onClick={this.handleClick}>{text}, click to toggle state </p>);
    }
});

// onChange
var MyInput = React.createClass({
    getInitialState: function () {
        return {value: 'hello'};
    },
    handleChange: function (event) {
        this.setState({value: event.target.value});
    },
    render: function () {
        var value = this.state.value;
        return (
            <div>
                <input type="text" value={value} onChange={this.handleChange}/>
                <p>{value}</p>
            </div>
        );
    }
});

// PropTypes
var MyPropTypes = React.createClass({
    propTypes: {
        title: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {title: 'defaultTitle'};
    },
    render: function () {
        return (
            <b>{this.props.title}</b>
        );
    }
});

// mixins & 组合
var mixin = {
    propTypes: {
        title: React.PropTypes.string
    },
    getDefaultProps: function () {
        return {title: 'defaultTitle'};
    }
};
var A = React.createClass({
    mixins: [mixin],
    render: function () {
        return (<i>{this.props.title}</i>);
    }
});
var B = React.createClass({
    mixins: [mixin],
    render() {
        return (<b>{this.props.title}: <A title={2}></A></b>);
    }
});

// controlled components
var ControlledComponent = React.createClass({
    getInitialState() {
        return {value: 'uncontrolled input'};
    },
    handleChange(event) {
        this.setState({value: event.target.value});
    },
    render() {
        return (
            <div>
                <input value={this.state.value} onChange={this.handleChange}/>
                <input value='controlled input'/>
                <p>{this.state.value}</p>
            </div>
        );
    }
});

// Component Lifecycle
var LifeCycleLog = React.createClass({
    getInitialState() {
        console.log('getInitialState');
        return {value: this.props.value};
    },
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');
        this.setState({value: nextProps.value});
    },
    shouldComponentUpdate() {
        console.log('shouldComponentUpdate');
        return true;
    },
    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate: ' + ',nextProps: ' + nextProps.value + ', nextState: ' + nextState.value);
    },
    componentWillMount() {
        console.log('componentWillMount');
    },
    render() {
        console.log('render');
        return <span>{this.props.value}</span>
    },
    componentDidMount() {
        console.log('componentDidMount');
    },
    componentDidUpdate() {
        console.log('componentDidUpdate');
    },
    componentWillUnmount() {
        console.log('componentWillUnmount');
    }
});
var LifeCycleTest = React.createClass({
    getInitialState() {
        return {
            value: 1,
            destoryed: false
        };
    },
    increase() {
        this.setState({value: this.state.value + 1});
    },
    destroy() {
        this.setState({destroyed: true});
    },
    render: function() {
        if (this.state.destroyed) {
            return null;
        }
        return (
            <div>
                <p>
                    <button onClick={this.increase}>Increase</button>
                    <button onClick={this.destroy}>Destroy</button>
                </p>
                <LifeCycleLog value={this.state.value}></LifeCycleLog>
            </div>
        );
    }
});

ReactDOM.render(<CommentBox name="CommentBox"/>, document.getElementById('comment-box'));
ReactDOM.render(<div>{nameDiv}</div>, document.getElementById('name-div'));
ReactDOM.render(<NameList />, document.getElementById('name-list'));
ReactDOM.render(<MyComponent />, document.getElementById('my-component'));
ReactDOM.render(<NodeList>
    <span>child1</span>
    <span>child2</span>
</NodeList>, document.getElementById('node-list'));
ReactDOM.render(<LikeButton></LikeButton>, document.getElementById('like-button'));
ReactDOM.render(<MyInput></MyInput>, document.getElementById('my-input'));
ReactDOM.render(<MyPropTypes title='指定title' title={2}></MyPropTypes>, document.getElementById('my-prop-types'));
ReactDOM.render(<B/>, document.getElementById('my-mixin'));
ReactDOM.render(<ControlledComponent></ControlledComponent>, document.getElementById('controlled-component'));
ReactDOM.render(<LifeCycleTest></LifeCycleTest>, document.getElementById('lifecycle-test'));
