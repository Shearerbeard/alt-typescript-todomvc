/// <reference path="./typings/references.d.ts"/>

import {todoActions} from "./actions/TodoActions";
import {default as todoStore} from "./stores/TodoStore";

import {default as TodoApp} from "./components/TodoApp";
import * as React from "react";

React.render(
  React.createElement(TodoApp, {}),
  document.getElementById('todoapp')
);
