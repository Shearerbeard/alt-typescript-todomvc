import {alt} from "../alt";
import Alt = require("alt");
import {Todo} from "../stores/TodoStore";

interface Actions {
  create(text:string);
  updateText(todo:Todo);
  toggleComplete(id:string);
  toggleCompleteAll();
  destroy(id:string);
  destroyCompleted();
}

class AbstractActions {
   constructor(options) {}
   dispatch() {}
   generateActions( ...args:Array<string>):void {};
   actions:any;
}

class TodoActions extends AbstractActions {
  constructor(config) {
    this.generateActions(
      "create",
      "updateText",
      "toggleComplete",
      "toggleCompleteAll",
      "destroy",
      "destroyCompleted");
    super(config);
  }
}

export const todoActions = alt.createActions<Actions>(TodoActions);

export default todoActions;
