/**
 * @jest-environment jsdom
 */

import * as main from "../ts/main";
import * as functions from "../ts/functions";
import { Todo } from "../ts/models/Todo";

beforeEach(() => {
    document.body.innerHTML = ``;
    jest.restoreAllMocks();
});



/**************************************************************
 **** Test of function "createNewTodo", line 24 in main.ts ****
 **************************************************************/

describe('Testing that createNewTodo functions properly', () => {

    test('should create new todo and add it to the DOM', () => {

        //Arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`
        let todoText: string = "test text";
        let todos: Todo[] = [];

        //Act
        main.createNewTodo(todoText, todos);

        let strucktureCheck = document.querySelector('#todos')?.innerHTML;
        let expected = `<li class="todo__text">test text</li>`;
        let result = document.querySelector('.todo__text')?.innerHTML;

        //Assert
        expect(result).toBe('test text');
        expect(strucktureCheck).toBe(expected);

    });

    test('should not create new todo and add it to the DOM', () => {

        //Arrange
        document.body.innerHTML = `<div id="error" class="error"></div>`
        let todoText: string = "X";
        let todos: Todo[] = [];

        //Act
        main.createNewTodo(todoText, todos);

        let result = document.querySelector('#error')?.classList.contains("show");

        //Assert
        expect(result).toBe(true);

    });

});

 /**************************************************************
 ****** Test of function "createHtml", line 34 in main.ts ******
 **************************************************************/

 describe('testing that createHtml function properly', () => {

    test('testing that fetching from localStorage is done correctly', () => {

        //Arrange
        let todo: Todo[] = [{text: 'test', done: false}];
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`

        //Act
        main.createHtml(todo)
        let fetchedTodo = JSON.parse(localStorage.getItem("todos") || "[]");

        //Assert
        expect(fetchedTodo.length).toBe(1);

    });

    test('should render todos corretly', () => {

        //Arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`

        let todos: Todo[] = [{text: 'test', done: false}];

        let renderedTodoList = `<li class="todo__text">test</li>`;

        //Act
        main.createHtml(todos);

        let result = document.querySelector('#todos')?.innerHTML;

        //Assert
        expect(result).toEqual(renderedTodoList);
    });

    test('should add css class if todo done is true', () => {

        //Arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`

        let todos: Todo[] = [{text: 'test', done: true}];

        // let renderedTodoList = `<li class="todo__text">test</li>`;

        //Act
        main.createHtml(todos);

        let result = document.querySelector('#todos')?.firstElementChild

        //Assert
        expect(result?.classList.contains("todo__text--done")).toBe(true);
    })

    test('clicked li should call the function toggleTodo', () => {

        //Arrange
        document.body.innerHTML = `<ul id="todos" class="todo"></ul>`
        let todos: Todo[] = [{text: 'test', done: true}];
        let spyOnToggleTodo = jest.spyOn(main, 'toggleTodo').mockReturnValue();

        //Act
        main.createHtml(todos);

        document.querySelector('li')?.click();

        //Assert
        expect(spyOnToggleTodo).toHaveBeenCalled();

        spyOnToggleTodo.mockRestore();

    });

    test('should call "sortTodos" correctly', () => {

        //Arrange
        document.body.innerHTML = `<ul id="todos" class="todos">`
        let todos: Todo[] = [{text: 'test', done: true}];
        let spyOnSortTodos = jest.spyOn(functions, 'sortTodos').mockReturnValue();

        //Act
        main.createHtml(todos);

        //Assert
        expect(spyOnSortTodos).toHaveBeenCalled();
        spyOnSortTodos.mockRestore();

    });

});


/**************************************************************
 ***** Test of function "toggleTodo", line 60 in main.ts ******
 **************************************************************/

describe('testing that toggleTodo calls it functions correctly', () => {

    test('should call changeTodo correctly', () => {
        //Arrange
        let spyOnChangeTodo = jest.spyOn(functions, 'changeTodo').mockReturnValue();
        let spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();
        let todos: Todo = { text: 'test', done: false };

        //Act
        main.toggleTodo(todos);

        //Assert
        expect(spyOnChangeTodo).toHaveBeenCalled();
        expect(spyOnChangeTodo).toHaveBeenCalledTimes(1);

        spyOnChangeTodo.mockRestore();
        spyOnCreateHtml.mockRestore();

    });

    test('should call createHtml correctly', () =>{

        //Arrange
        let spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();
        let todos: Todo = { text: 'test', done: false };

        //Act
        main.toggleTodo(todos);

        //Assert
        expect(spyOnCreateHtml).toHaveBeenCalled();
        expect(spyOnCreateHtml).toHaveBeenCalledTimes(1);

        spyOnCreateHtml.mockRestore();
    });
});

/***************************************************************
 ***** Test of function "displayError", line 65 in main.ts *****
 ***************************************************************/

describe('should add or remove css class on div depending on argument value', () =>{

    test('should add class "show" if argument is true', () => {

        //Arrange
        let errorText = 'An error has occured';
        document.body.innerHTML = `
        <div id="error" class="error"></div>
        `;

        //Act
        main.displayError(errorText, true);

        // Assert
        let result = document.getElementById('error') as HTMLDivElement;
        expect(result.classList.contains("show")).toBe(true);
    });

     test('should remove class "show" if argument is false', () => {

        //Arrange
        let errorText = 'An error has occured';
        document.body.innerHTML = `
        <div id="error" class="error"></div>
        `;

        //Act
        main.displayError(errorText, false);

        // Assert
        let result = document.getElementById('error') as HTMLDivElement;
        expect(result.classList.contains("show")).toBe(false);
    });

});

 /**************************************************************
 ***** Test of function "clearTodos", line 79 in main.ts *******
 **************************************************************/ 

describe('testing if clearTodos call its functions correctly', () => {

    test('should call "removeAllTodos" correctly', () => {

        //Arrange
        let spyOnRemoveAllTodos = jest.spyOn(functions, 'removeAllTodos').mockReturnValue();
        let spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();
        
        const todo: Todo[] = [new Todo('test', false)];

        //Act
        main.clearTodos(todo);

        //Assert
        expect(spyOnRemoveAllTodos).toHaveBeenCalled();
        expect(spyOnRemoveAllTodos).toBeCalledTimes(1);
        spyOnCreateHtml.mockRestore();
        spyOnRemoveAllTodos.mockRestore();
    });

    test('should call "createHtml" correctly', () => {

        //Arrange
        let spyOnCreateHtml = jest.spyOn(main, 'createHtml').mockReturnValue();
        
        //Act
        main.clearTodos([]);

        //Assert
        expect(spyOnCreateHtml).toHaveBeenCalled();
        expect(spyOnCreateHtml).toBeCalledTimes(1);
        spyOnCreateHtml.mockRestore();

    });
});

