import { calculateProgress } from 'common/progress';
import { ITask } from 'types';

describe('Common progress function', () => {
  it('Should 50% progress', () => {
    const tasks: ITask[] = [
      {
        id: 1,
        label: 'Teste',
        completed: true,
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 2,
        label: 'Teste 2',
        completed: false,
        createdAt: '',
        updatedAt: '',
      },
    ];
    const progress = calculateProgress(tasks);
    expect(progress).toEqual(50);
  });
  it('Should 100% progress', () => {
    const tasks: ITask[] = [
      {
        id: 1,
        label: 'Teste',
        completed: true,
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 2,
        label: 'Teste 2',
        completed: true,
        createdAt: '',
        updatedAt: '',
      },
    ];
    const progress = calculateProgress(tasks);
    expect(progress).toEqual(100);
  });
  it('Should 0% when empty array', () => {
    const progress = calculateProgress([]);
    expect(progress).toEqual(0);
  });
});
