type User = {
  name: string
  subzero: boolean
  age: number
  id?: number
};

const user: User = {
  name: 'subzero',
  subzero: true,
  age: 14
};

console.log(user.name)