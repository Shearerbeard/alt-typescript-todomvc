/// <reference path="../typings/references.d.ts"/>

import * as React from "react";
import {default as Footer} from "./Footer";
import {default as Header} from "./Header";
import {default as MainSection} from "./MainSection";
import {default as TodoStore, Todo} from "../stores/TodoStore";


interface State {
  allTodos:{[key:string]:Todo};
  areAllComplete:boolean;
}

function getTodoState():State {
  return {
    allTodos: TodoStore.getState().todos,
    areAllComplete: TodoStore.areAllComplete()
  }
}

export default class TodoApp extends React.Component<any, State> {
  constructor() {
    let _state = getTodoState();
    this.state = _state;
    /**
      bind es6 methods so they are referenced properly when executed by jsx
    */
    this._onChange = this._onChange.bind(this);
    super();
  }

  render() {
    return React.jsx(`
      <div>
        <Header />
        <MainSection
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
        <Footer allTodos={this.state.allTodos} />
      </div>
    `);
  }

  componentDidMount() {
    TodoStore.listen(this._onChange);
  }

  componentWillUnmount() {
    TodoStore.unlisten(this._onChange);
  }

  _onChange() {
    this.setState(getTodoState());
  }
}
