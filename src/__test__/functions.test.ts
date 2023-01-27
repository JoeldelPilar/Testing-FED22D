import { changeTodo, removeAllTodos, sortTodos } from "../ts/functions";
import { Todo } from "../ts/models/Todo";

/*************************************************
 **** Test for adding todo to array:"addTodo" ****
 *************************************************/



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

/*************************************************
 ** Test for sorting the todo-list: "sortTodos" **
 *************************************************/

 test('should sort the list, done tasks go last', () => {

    //Arrange
    let todos = [
        {text: 'test', done: true},
        {text: 'false', done: false},
        {text: 'false', done: false}
    ];

    let result = [
        {text: 'false', done: false},
        {text: 'false', done: false},
        {text: 'test', done: true}
    ];

    //Act
    sortTodos(todos);

    //Assert
    expect(todos).toEqual(result);
 })