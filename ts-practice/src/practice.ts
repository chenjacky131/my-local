interface Person {
  name: string;
  age: number;
  gender: string;
}
type P1 = Omit<Person, 'gender' | 'age'>; //  {name: string}
const user:P1 = {
  name: 'tom'
}