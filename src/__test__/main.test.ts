/**
 * @jest-environment jsdom
 */

import * as main from "../ts/main";
import * as functions from "../ts/functions";
import { Todo } from "../ts/models/Todo";

beforeEach(() => {
    document.body.innerHTML = ``;
    jest.restoreAllMocks;
});

/**************************************************************
 **** Test of function "createNewTodo", line 24 in main.ts ****
 **************************************************************/

//  test('should create new todo and add it to the array if arguments of "addTodo" is true', () => {



//  });

 /**************************************************************
 ****** Test of function "createHtml", line 34 in main.ts ******
 **************************************************************/

/**************************************************************
 ***** Test of function "toggleTodo", line 60 in main.ts ******
 **************************************************************/

describe('testing that toggleTodo calls it functions correctly', () => {
    test('should call changeTodo correctly', () => {
        document.body.innerHTML =
		'<ul id="todos" class="todo">';

        const todos: Todo[] = [
		{ text: 'test', done: false }
        ];

        let spyOnChangeTodo = jest.spyOn(functions, 'changeTodo').mockReturnValue();

        main.toggleTodo(todos[0]);

        expect(spyOnChangeTodo).toHaveBeenCalled();

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
        
        //Act
        main.clearTodos([]);

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

