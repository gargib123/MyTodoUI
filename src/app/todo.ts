export class Todo {
  id: number;
  name = '';
  isComplete = false;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
