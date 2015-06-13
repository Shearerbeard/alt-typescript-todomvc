/// <reference path="../typings/references.d.ts"/>

import * as React from "react";

interface Props {
  className?:string;
  id?:string;
  placeholder?:string;
  onSave:( value:string) => void;
  value?:string;
}

interface State {
  value:string;
}

const ENTER_KEY_CODE = 13;

export default class TodoTextInput extends React.Component<Props, State> {
  constructor(props) {

    this.state = {
      value:props.value || ""
    };

    /**
      bind es6 methods so they are referenced properly when executed by jsx
    */
    this._onKeyDown = this._onKeyDown.bind(this);
    this._save = this._save.bind(this);
    this._onChange = this._onChange.bind(this);

    super(props);
  }

  render() {
    return React.jsx(`

      <input
        className={this.props.className}
        id={this.props.id}
        placeholder={this.props.placeholder}
        onChange={this._onChange}
        onBlur={this._save}
        onKeyDown={this._onKeyDown}
        value={this.state.value}
        autoFocus={true} />

    `);
  }

  _onChange(event:React.SyntheticEvent) {
    // Casting React SyntheticEvent target as input to access value prop;
    let target:HTMLInputElement = <HTMLInputElement>event.target;
    this.setState({value: target.value})
  }

  _save() {
    this.props.onSave(this.state.value);
    this.setState({value: ''});
  }

  _onKeyDown(event:KeyboardEvent) {
    if(event.keyCode === ENTER_KEY_CODE) {
      this._save();
    }
  }
}
