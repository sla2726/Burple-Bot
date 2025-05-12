const sub = (a: number, b: number) => {
  return a - b
};
console.log(sub(5, 3));

type User = {
  name: string
  subzero: boolean
  age: number
  id: number
}

const user: User = {
  name: 'subzero',
  subzero: true,
  age: 14,
  id: 01
}