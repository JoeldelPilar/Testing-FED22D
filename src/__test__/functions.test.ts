import { changeTodo, removeAllTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo";

/*************************************************
 **** Test for compleating todo: "changeTodo" ****
 *************************************************/

test('should switch false to true', () => {

    const todo= new Todo('test', false);

    changeTodo(todo)

    expect(todo.done).toBe(true);
});

/*************************************************
 * Test for clearing todo-list: "removeAllTodos" *
 *************************************************/

test('should clear all todos', () => {
    let todos: Todo[] = [
        {text: 'test', done: true},
        {text: 'test2', done: true}
    ]; 

    removeAllTodos(todos);


    expect(todos.length).toBe(0);
});