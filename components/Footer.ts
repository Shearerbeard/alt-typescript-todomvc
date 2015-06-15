import * as React from "react";
import {default as TodoActions} from "../actions/TodoActions";
import {Todo} from "../stores/TodoStore";

interface Props {
   allTodos: {[key:string]:Todo}
}

export default class Footer extends React.Component<Props, any> {
  constructor() {
    /**
      bind es6 methods so they are referenced properly when executed by jsx
    */
    this._onClearCompletedClick = this._onClearCompletedClick.bind(this);
    super();
  }

  render() {
    let allTodos = this.props.allTodos;
    let todoKeys = Object.keys(allTodos);
    let total = todoKeys.length;

    if(total === 0) return null;

    let completed = todoKeys.filter(key => allTodos[key].complete).length;

    let itemsLeft = total - completed;
    let itemsLeftPhrase = ` ${itemsLeft === 1? 'item' : 'items'} left`;

    let clearCompletedButton = (completed)?
      React.jsx(`

          <button
            id="clear-completed"
            onClick={this._onClearCompletedClick}>
            Clear completed ({completed})
          </button>

        `) : undefined;

    return React.jsx(`

          <footer id="footer">
            <span id="todo-count">
              <strong>
                {itemsLeft}
              </strong>
              {itemsLeftPhrase}
            </span>
            {clearCompletedButton}
          </footer>

      `);

  }

  _onClearCompletedClick() {
    TodoActions.destroyCompleted();
  }
}
