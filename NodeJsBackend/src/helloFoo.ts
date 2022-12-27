export const helloFoo: () => string = () => {
  return `hello ${process.env.FOO}`;
};
