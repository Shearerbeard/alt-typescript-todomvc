/// <reference path="../typings/references.d.ts"/>

import * as React from "react";
import {todoActions} from "../actions/TodoActions";
import {default as TodoTextInput} from "./TodoTextInput";
import {Todo} from "../stores/TodoStore";
import cx = require("react/lib/cx");

interface Props {
  todo:Todo;
}

interface State {
  isEditing:boolean;
}

export default class TodoItem extends React.Component<Props, State> {
  constructor() {

    this.state = {isEditing: false};

    /**
      bind es6 methods so they are referenced properly when executed by jsx
    */
    this._onToggleComplete = this._onToggleComplete.bind(this);
    this._onDoubleClick = this._onDoubleClick.bind(this);
    this._onSave = this._onSave.bind(this);
    this._onToggleComplete = this._onToggleComplete.bind(this);
    this._onDestroyClick = this._onDestroyClick.bind(this);

    super();
  }

  render() {
    let todo = this.props.todo;

    var input;
    if(this.state.isEditing) {
      console.warn("Assigning input value " + this.props.todo.text)
      input = React.jsx(`

          <TodoTextInput
            className="edit"
            onSave={this._onSave}
            value={todo.text} />

      `);
    }

    return React.jsx(`

        <li
         className={cx({
           'completed': todo.complete,
           'editing': this.state.isEditing
         })}
         key={todo.id}>
         <div className="view">
           <input
             className="toggle"
             type="checkbox"
             checked={todo.complete}
             onChange={this._onToggleComplete}
           />
           <label onDoubleClick={this._onDoubleClick}>
             {todo.text}
           </label>
           <button className="destroy" onClick={this._onDestroyClick} />
         </div>
         {input}
       </li>

    `);
  }

  _onToggleComplete() {
    todoActions.toggleComplete(this.props.todo.id);
  }

  _onDoubleClick() {
    this.setState({isEditing: true});
  }

  _onSave(text:string) {
    todoActions.updateText({
      id: this.props.todo.id,
      text: text
    });
    this.setState({isEditing: false});
  }

  _onDestroyClick() {
    todoActions.destroy(this.props.todo.id);
  }

}
