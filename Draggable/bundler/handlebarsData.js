const handlebarsHelperInc = (value, options) => {
  const newVal = parseInt(value) + 1;
  return `${newVal <= 9 ? "0" : ""}${newVal}`;
};

const getHomeUrlFactory = (isHomeView) => {
  return () => {
    return isHomeView ? "" : "/";
  };
};

const handlebarsDataCompile = {
  baseUrl: "/",
  cards: [
    {
      title: "Title 1",
      zIndex: 5,
    },
    {
      title: "Title 2",
      zIndex: 4,
    },
    {
      title: "Title 3",
      zIndex: 3,
    },
    {
      title: "Title 4",
      zIndex: 2,
    },
    {
      title: "Title 5",
      zIndex: 1,
    },
  ],
};

exports.handlebarsHelperInc = handlebarsHelperInc;
exports.getHomeUrlFactory = getHomeUrlFactory;
exports.handlebarsDataCompile = handlebarsDataCompile;
