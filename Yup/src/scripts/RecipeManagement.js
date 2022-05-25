import templateColIngredient from "./template-col-ingredient";

class RecipeManagement {
  constructor(cbOnSubmit) {
    this.recipe = {
      title: undefined,
      description: undefined,
      difficulty: undefined,
      image: undefined,
      numDiners: undefined,
      ingredients: [],
      instructions: undefined,
      acceptance: false,
    };
    this.cbOnSubmit = cbOnSubmit;
    this.form = document.querySelector(".recipe-form");
    this.errorsContainer = this.form.querySelector(".errors-list");
    this.addListeners();
  }
  addListeners() {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (typeof this.cbOnSubmit === "function") {
        this.updateRecipe();
        this.cbOnSubmit(this.getRecipe());
      }
    });
    this.form
      .querySelector(".field-ingredients")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("add-ingredients-btn")) {
          return this.handleOnClickIngredientBtn(e.target);
        }
      });
    this.form
      .querySelector('input[type="checkbox"]')
      .addEventListener("change", (e) => {
        this.recipe.acceptance = e.target.checked;
      });
    this.form
      .querySelector('input[type="file"]')
      .addEventListener("change", (e) => {
        if (e.target.files.length <= 0) {
          return;
        }
        const file = e.target.files[0];
        e.currentTarget.closest(".file").querySelector(".file-name").innerHTML =
          file.name;
        this.recipe.image = {
          size: file.size,
          type: file.type,
        };
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
  }
  updateRecipe() {
    this.errorsContainer.classList.add("is-hidden");
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      this.recipe[field.getAttribute("name")] = field.value;
    });
  }
  showErrors(errors) {
    this.errorsContainer.classList.remove("is-hidden");
    this.errorsContainer.innerHTML = "";
    const ul = document.createElement("ul");
    Object.keys(errors).forEach((errorKey) => {
      const message = errors[errorKey];
      const li = document.createElement("li");
      li.innerHTML = message;
      ul.appendChild(li);
    });
    this.errorsContainer.appendChild(ul);
  }
  getRecipe() {
    return this.recipe;
  }
}

export default RecipeManagement;
