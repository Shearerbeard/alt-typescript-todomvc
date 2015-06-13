/// <reference path="../typings/references.d.ts"/>

import * as React from "react";
import {default as todoActions} from "../actions/TodoActions";
import {default as TodoTextInput} from "./TodoTextInput";


export default class Header extends React.Component<any, any> {
  constructor() {
    /**
      bind es6 methods so they are referenced properly when executed by jsx
    */
    this._onSave = this._onSave.bind(this);
    super();
  }

  render() {
    return React.jsx(`

      <header id="header">
        <h1>todos</h1>
        <TodoTextInput
          id="new-todo"
          placeholder="What needs to be done?"
          onSave={this._onSave} />
      </header>

    `);
  }

  _onSave(text:string) {
    if(text.trim()) todoActions.create(text);
  }
}
