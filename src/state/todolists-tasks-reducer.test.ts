import { addTodolistAC, todolistsReducer } from './todolists-reducer';
import { TasksStateType } from '../app/App';
import { TodolistDomainType } from './todolists-reducer.type';
import { tasksReducer } from './tasks-reducer';

test('added todolist', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistState: Array<TodolistDomainType> = [];
  const newTodolist = {
    id: 'QWERTY',
    title: 'New todolist title',
    addedDate: '',
    order: 0,
  };
  const action = addTodolistAC(newTodolist);
  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistState = todolistsReducer(startTodolistState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolist = endTodolistState[0].id;

  expect(idFromTasks).toBe(action.newTodolist.id);
  expect(idFromTodolist).toBe(action.newTodolist.id);
});
