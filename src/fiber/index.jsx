import React from "react";
import ReactDOM from "react-dom";
import * as scheduler from "scheduler";
import { spin } from "../common/spin.js";
import { ContextExample } from "./ContextExample.jsx";

const classes = ["", "red", "blue"];
const getCurrentClass = index => classes[index];
const getNextIndex = currentIndex => (currentIndex + 1) % classes.length;

class Item extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.num !== this.props.num ||
      nextProps.className !== this.props.className
    );
  }

  render() {
    const { num, className } = this.props;
    return <div className={className}>{num}</div>;
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);

    spin("List.constructor");

    this.state = {
      classIndex: 0,
      values: [1, 2, 3]
    };
  }

  square = () => {
    // facebook/react#13488 seems to imply deferredUpdates is no longer necessary
    // Also see note in changelog: facebook/react#13571
    scheduler.unstable_scheduleCallback(scheduler.unstable_IdlePriority, () =>
      this.setState(prevState => ({
        values: prevState.values.map(value => value * value)
      }))
    );
  };

  addChild = () => {
    scheduler.unstable_scheduleCallback(scheduler.unstable_IdlePriority, () =>
      this.setState(prevState => ({
        values: [...prevState.values, prevState.values.length + 1]
      }))
    );
  };

  removeChild = () => {
    scheduler.unstable_scheduleCallback(scheduler.unstable_IdlePriority, () =>
      this.setState(prevState => ({
        values: prevState.values.slice(0, -1)
      }))
    );
  };

  nextClass = () => {
    this.setState({
      classIndex: getNextIndex(this.state.classIndex)
    });
  };

  nextClassAndSquare = () => {
    scheduler.unstable_scheduleCallback(scheduler.unstable_IdlePriority, () =>
      this.setState(prevState => ({
        classIndex: getNextIndex(this.state.classIndex),
        values: prevState.values.map(value => value * value)
      }))
    );
  };

  static getDerivedStateFromProps(props, state) {
    spin("List.getDerivedStateFromProps");
    return {};
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    spin("List.render");

    const itemClass = getCurrentClass(this.state.classIndex);

    return (
      <React.Fragment>
        <h2>Fiber List operations</h2>
        <button className="action" onClick={this.square}>
          ^2
        </button>
        <button className="action" onClick={this.addChild}>
          Add child
        </button>
        <button className="action" onClick={this.removeChild}>
          Remove child
        </button>
        <button className="action" onClick={this.nextClass}>
          Next class
        </button>
        <button className="action" onClick={this.nextClassAndSquare}>
          Next class and square
        </button>
        {this.state.values.map((value, index) => (
          <Item className={itemClass} key={index} num={value} />
        ))}
      </React.Fragment>
    );
  }

  componentDidMount() {
    spin("List.componentDidMount");
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    spin("List.getSnapshotBeforeUpdate");
    return {};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    spin("List.componentDidUpdate");
  }
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <React.Fragment>
    <List />
    <ContextExample />
  </React.Fragment>
);
