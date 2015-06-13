import {alt} from "../alt";
import Alt = require("alt");
import merge = require("react/lib/Object.assign");
import {todoActions} from "../actions/TodoActions";

export interface Todo {
  id:string;
  complete?:boolean;
  text:string;
}

interface State {
  todos:{[key:string]:Todo}
}

class StoreModel {
    bindActions( ...actions:Array<Object>):void {};
    getState():State {
      return <State>{};
    };
}

interface ExtendedAltStore extends AltJS.AltStore<State> {
  areAllComplete?():boolean;
}

class TodoStore extends StoreModel implements AltJS.StoreModel<State> {

  todos:{[key:string]:Todo};

  constructor() {
    this.bindActions(todoActions)
    this.todos = {};
    super();
  }

  update(id, updates) {
    if(this.todos[id] && updates){
      this.todos[id] = merge(this.todos[id], updates)
    }
  }

  updateAll(updates) {
    for (var id in this.todos) {
      this.update(id, updates)
    }
  }

  onCreate(text) {
    text = text.trim()
    if (text === '') {
      return false
    }
    // hand waving of course.
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36)
    this.todos[id] = {
      id: id,
      complete: false,
      text: text
    }
  }

  onUpdateText(x) {
    var { id, text } = x

    text = text ? text.trim() : ''
    if (text === '') {
      return false
    }
    this.update(id, { text })
  }

  onToggleComplete(id) {
    var complete = !this.todos[id].complete
    this.update(id, { complete })
  }

  onToggleCompleteAll() {
    // var complete = !todoStore.areAllComplete()
    let complete = true;
    this.updateAll({ complete })
  }

  onDestroy(id) {
    delete this.todos[id]
  }

  onDestroyCompleted() {
    for (var id in this.todos) {
      if (this.todos[id].complete) {
        this.onDestroy(id)
      }
    }
  }
};

function areAllComplete() {
  var { todos } = this.getState();
    for (var id in todos) {
      if (!todos[id].complete) {
        return false
      }
    }
    return true
}

let todoStore = alt.createStore<State>(TodoStore);

let extendedTodoStore:ExtendedAltStore = todoStore;

extendedTodoStore.areAllComplete = areAllComplete.bind(todoStore);

export default extendedTodoStore;
