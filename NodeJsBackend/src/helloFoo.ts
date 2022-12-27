export const helloFoo: () => string = () => {
  return `Hello ${process.env.FOO}`;
};
