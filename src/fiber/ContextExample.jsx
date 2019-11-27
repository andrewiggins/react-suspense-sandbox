import * as React from "react";

const { Fragment } = React;

const ctx = React.createContext({});
class MyProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: 0 };
  }

  toggle() {
    this.setState(({ value }) => ({ value: (value + 1) % 2 }));
  }

  render() {
    return (
      <Fragment>
        <div>
          <button onClick={() => this.toggle()}>Toggle</button>
        </div>
        <ctx.Provider value={this.state.value}>
          {this.props.children}
        </ctx.Provider>
      </Fragment>
    );
  }
}

const MyChild = () => {
  return (
    <React.Fragment>
      {Date.now()}
      <ctx.Consumer>
        {value => {
          return <p>{value}</p>;
        }}
      </ctx.Consumer>
    </React.Fragment>
  );
};

export function ContextExample() {
  return (
    <MyProvider>
      <MyChild />
    </MyProvider>
  );
}
