import templateColIngredient from "./template-col-ingredient";

class RecipeManagement {
  constructor() {
    this.recipe = {
      title: undefined,
      description: undefined,
      difficulty: undefined,
      image: undefined,
      numDiners: undefined,
      ingredients: [],
      instructions: undefined,
    };
    this.form = document.querySelector(".recipe-form");
    this.addListeners();
  }
  addListeners() {
    this.form.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-ingredients-btn")) {
        return this.handleOnClickIngredientBtn(e.target);
      }
    });
  }
  handleOnClickIngredientBtn(ingredientBtn) {
    const colIngredient = ingredientBtn.parentElement.parentElement;

    if (ingredientBtn.classList.contains("is-danger")) {
      const idIngredientBtn = Number(ingredientBtn.dataset.idIngredient);
      this.recipe.ingredients = this.recipe.ingredients.filter((ingredient) => {
        return ingredient.id !== idIngredientBtn;
      });
      colIngredient.parentElement.removeChild(colIngredient);
      return;
    }

    const nameField = colIngredient.querySelector('[name="ingredient-name"]');
    const quantityField = colIngredient.querySelector(
      '[name="ingredient-quantity"]'
    );
    const id = Date.now();

    this.recipe.ingredients.push({
      id,
      name: nameField.value,
      quantity: quantityField.value,
    });

    nameField.setAttribute("disabled", true);
    quantityField.setAttribute("disabled", true);
    ingredientBtn.classList.remove("is-primary");
    ingredientBtn.classList.add("is-danger");
    ingredientBtn.innerHTML = "Delete";
    ingredientBtn.dataset.idIngredient = id;

    const template = new DOMParser().parseFromString(
      templateColIngredient,
      "text/html"
    );

    const element = template.children[0].children[1].children[0];
    colIngredient.parentElement.appendChild(element);
    console.log(this.recipe.ingredients);
  }
}

export default RecipeManagement;
