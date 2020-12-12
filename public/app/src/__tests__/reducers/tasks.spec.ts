import tasksReducer, { IReducerTasksState, TasksActions } from 'reducers/tasks';

describe('Testing tasks reducer', () => {
  it('should init state', () => {
    const initialState = { tasks: [], progress: 0 };
    const newState: IReducerTasksState = {
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: false },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 50,
    };
    const state = tasksReducer(initialState, TasksActions.initTasks(newState));
    expect(state).toMatchObject(newState);
  });

  it('should delete task and recalculate progress', () => {
    const initialState: IReducerTasksState = {
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: false },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 50,
    };
    const state = tasksReducer(initialState, TasksActions.deleteTask({ taskId: 2 }));
    expect(state).toMatchObject({
      tasks: [{ id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: true }],
      progress: 100,
    });
  });

  it('should toggle completed status to true task and calculate progress', () => {
    const initialState: IReducerTasksState = {
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: false },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 50,
    };
    const state = tasksReducer(initialState, TasksActions.toggleTask({ taskIndex: 0 }));
    expect(state).toMatchObject({
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: true },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 100,
    });
  });

  it('should toggle completed status to false task and calculate progress', () => {
    const initialState: IReducerTasksState = {
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: false },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 50,
    };
    const state = tasksReducer(initialState, TasksActions.toggleTask({ taskIndex: 1 }));
    expect(state).toMatchObject({
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: false },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: false },
      ],
      progress: 0,
    });
  });

  it('should add task and calculate progress', () => {
    const initialState: IReducerTasksState = {
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: true },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: false },
        { id: 3, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 50,
    };

    const newTask = { id: 4, label: 'Teste 3', createdAt: '', updatedAt: '', completed: false };
    const state = tasksReducer(initialState, TasksActions.addTask({ newTask }));

    expect(state).toMatchObject({
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: true },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: false },
        { id: 3, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
        { id: 4, label: 'Teste 3', createdAt: '', updatedAt: '', completed: false },
      ],
      progress: 50,
    });
  });

  it('should add task in index 2 and calculate progress', () => {
    const initialState: IReducerTasksState = {
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: true },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: false },
        { id: 3, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 50,
    };

    const newTask = { id: 4, label: 'Teste 3', createdAt: '', updatedAt: '', completed: false };
    const state = tasksReducer(initialState, TasksActions.addTask({ newTask, index: 2 }));

    expect(state).toMatchObject({
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: true },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: false },
        { id: 4, label: 'Teste 3', createdAt: '', updatedAt: '', completed: false },
        { id: 3, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 50,
    });
  });

  it('should add task in index 0 and calculate progress', () => {
    const initialState: IReducerTasksState = {
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: true },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: false },
        { id: 3, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 50,
    };

    const newTask = { id: 4, label: 'Teste 3', createdAt: '', updatedAt: '', completed: false };
    const state = tasksReducer(initialState, TasksActions.addTask({ newTask, index: 0 }));

    expect(state).toMatchObject({
      tasks: [
        { id: 4, label: 'Teste 3', createdAt: '', updatedAt: '', completed: false },
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: true },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: false },
        { id: 3, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 50,
    });
  });

  it('should update task that exists', () => {
    const initialState: IReducerTasksState = {
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: true },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: false },
        { id: 3, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 50,
    };

    const state = tasksReducer(initialState, TasksActions.updateTask({ taskId: 1, data: { label: 'Mudou' } }));

    expect(state).toMatchObject({
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: true },
        { id: 1, label: 'Mudou', createdAt: '', updatedAt: '', completed: false },
        { id: 3, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 50,
    });
  });

  it('should update task that dont exists', () => {
    const initialState: IReducerTasksState = {
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: true },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: false },
        { id: 3, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 50,
    };

    const state = tasksReducer(initialState, TasksActions.updateTask({ taskId: 5, data: { label: 'Mudou' } }));

    expect(state).toMatchObject(initialState);
  });

  it('should update task in initial position', () => {
    const initialState: IReducerTasksState = {
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: true },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: false },
        { id: 3, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 50,
    };

    const state = tasksReducer(initialState, TasksActions.updateTask({ taskId: 2, data: { label: 'Mudou' } }));

    expect(state).toMatchObject({
      tasks: [
        { id: 2, label: 'Mudou', createdAt: '', updatedAt: '', completed: true },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: false },
        { id: 3, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 50,
    });
  });

  it('should update task in final position', () => {
    const initialState: IReducerTasksState = {
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: true },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: false },
        { id: 3, label: 'Teste', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 50,
    };

    const state = tasksReducer(initialState, TasksActions.updateTask({ taskId: 3, data: { label: 'Mudou' } }));

    expect(state).toMatchObject({
      tasks: [
        { id: 2, label: 'Teste 2', createdAt: '', updatedAt: '', completed: true },
        { id: 1, label: 'Teste', createdAt: '', updatedAt: '', completed: false },
        { id: 3, label: 'Mudou', createdAt: '', updatedAt: '', completed: true },
      ],
      progress: 50,
    });
  });
});
