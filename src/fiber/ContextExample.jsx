import * as React from "react";

const { Fragment } = React;

const ctx = React.createContext(null);

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

const Time = () => <div>{Date.now()}</div>;

const MyChild = () => {
  return (
    <React.Fragment>
      {Date.now()}
      <Time />
      <ctx.Consumer>
        {(value) => {
          return <p>{value}</p>;
        }}
      </ctx.Consumer>
      <Time />
    </React.Fragment>
  );
};

export function ContextExample() {
  return (
    <Fragment>
      <h2>Context Example</h2>
      <MyProvider>
        <MyChild />
      </MyProvider>
    </Fragment>
  );
}
