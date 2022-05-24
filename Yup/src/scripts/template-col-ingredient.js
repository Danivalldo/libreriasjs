const templateColIngredient = `<div class="columns cols-ingredients">
<div class="column">
  <div class="control has-icons-left">
    <input
      class="input"
      type="text"
      name="ingredient-name"
      placeholder="Nombre del ingrediente"
      value=""
    />
    <span class="icon is-small is-left">
      <i class="mdi mdi-chili-mild"></i>
    </span>
  </div>
</div>
<div class="column">
  <div class="control has-icons-left">
    <input
      class="input"
      type="number"
      name="ingredient-quantity"
      placeholder="Cantidad"
      value=""
    />
    <span class="icon is-small is-left">
      <i class="mdi mdi-counter"></i>
    </span>
  </div>
</div>
<div class="column">
  <button
    class="button is-fullwidth is-primary add-ingredients-btn"
    type="button"
  >
    Añadir
  </button>
</div>
</div>`;

export default templateColIngredient;
