import { object, string, number, array, boolean } from "yup";
import RecipeManagement from "./scripts/RecipeManagement";
import "./SCSS/index.scss";

const schema = object({
  title: string()
    .required("El nombre del plato es obligatorio")
    .min(3, "El nombre tiene que tener almenos 3 letras"),
  description: string()
    .required("La descripción es obligatoria")
    .min(5, "La descripción debe tener almenos 5 letras"),
  image: object({
    size: number()
      .required("La imagen es obligatoria")
      .max(58753, "La imagen no puede superar los 59Kb "),
    type: string()
      .required("La imagen es obligatoria")
      .oneOf(
        ["image/png", "image/jpg", "image/jpeg", "image/gif"],
        "El formato de la imagen tiene que ser jpg, png, jpeg o gif"
      ),
  }).required(),
  difficulty: number()
    .typeError("El valor de dificultad tiene que ser numérico")
    .required("El nivel de dificultad es obligatorio")
    .positive("El nivel de dificultad tiene que ser entre 1 y 5")
    .min(1, "El nivel de dificultad tiene que ser entre 1 y 5")
    .max(5, "El nivel de dificultad tiene que ser entre 1 y 5"),
  numDiners: number()
    .typeError("El valor de comensales tiene que ser numérico")
    .required("El número de comensales es obligatorio")
    .positive("El número de comensales que ser entre 1 y 10")
    .min(1, "El número de comensales que ser entre 1 y 10")
    .max(10, "El número de comensales que ser entre 1 y 10"),
  ingredients: array()
    .of(
      object({
        id: number().required(),
        name: string().required("Debes darle un nombre al ingrediente"),
        quantity: number()
          .required()
          .typeError("La cantidad de ingrediente tiene que ser numérico")
          .positive("La cantidad de ingrediente tiene que ser mínimo de 1")
          .min(1, "La cantidad de ingrediente tiene que ser mínimo de 1"),
      })
    )
    .min(1, "Tienes que añadir almenos un ingrediente"),
  instructions: string()
    .required("Las instrucciones son obligatorias")
    .min(5, "Las instrucciones tienen que tener almenos 5 letras"),
  acceptance: boolean().isTrue("Tienes que aceptar las condiciones de uso"),
});

const handleOnSubmit = async (recipe) => {
  try {
    await schema.validate(recipe, {
      abortEarly: false,
    });
  } catch (err) {
    const validationErrors = {};
    err.inner.forEach((error) => {
      if (error.path && !validationErrors[error.path]) {
        validationErrors[error.path] = error.message;
      }
    });
    return recipeManagement.showErrors(validationErrors);
  }

  document.querySelector('button[type="submit"]').classList.add("is-loading");
  document.querySelector(".success-feedback").classList.add("is-hidden");
  window.setTimeout(() => {
    document
      .querySelector('button[type="submit"]')
      .classList.remove("is-loading");
    document.querySelector(".success-feedback").classList.remove("is-hidden");
  }, 500);
};

const recipeManagement = new RecipeManagement(handleOnSubmit);
