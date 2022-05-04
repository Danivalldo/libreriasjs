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
};

exports.handlebarsHelperInc = handlebarsHelperInc;
exports.getHomeUrlFactory = getHomeUrlFactory;
exports.handlebarsDataCompile = handlebarsDataCompile;
