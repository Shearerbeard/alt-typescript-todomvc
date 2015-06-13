
import * as React from "react";
import {Todo} from "../stores/TodoStore";
import {default as TodoItem} from "./TodoItem";
import {todoActions} from "../actions/TodoActions";

interface Props {
  allTodos:{[id:string]: Todo},
  areAllComplete:boolean
}

export default class MainSection extends React.Component<Props, any> {
  constructor() {
    /**
      bind es6 methods so they are referenced properly when executed by jsx
    */
    this._onToggleCompleteAll = this._onToggleCompleteAll.bind(this);
    super();
  }

  render() {

    let keys = Object.keys(this.props.allTodos);

    if (keys.length < 1) return null;

    var allTodos = this.props.allTodos;
    let todos = keys.map((key) =>
      React.jsx(` <TodoItem key={key} todo={allTodos[key]} /> `)); 

    return React.jsx(`

      <section id="main">
        <input
          id="toggle-all"
          type="checkbox"
          onChange={this._onToggleCompleteAll}
          checked={this.props.areAllComplete ? 'checked' : ''} />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">{todos}</ul>
      </section>

    `);
   }

   _onToggleCompleteAll() {
     todoActions.toggleCompleteAll();
   }
}
