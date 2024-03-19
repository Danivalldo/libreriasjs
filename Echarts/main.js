import "./style.css";
import radarChart from "./scripts/radarChart";
import calendarChart from "./scripts/calendarChart";
import sankeyChart from "./scripts/sankeyChart";
import pieChart from "./scripts/pieChart";

const charactersContainer = document.querySelector(".characters");

let charactersData;

const createCharactersUI = (wrestlers) => {
  for (let i = 0, j = wrestlers.length; i < j; i++) {
    const wrestler = wrestlers[i];
    const character = document.createElement("div");
    character.dataset.index = i;
    character.classList.add("character");
    character.innerHTML = `
      <h2>${wrestler.name}</h2>
      <img src="${wrestler.snap}" alt="${wrestler.name}" />
      <p>${wrestler.description}</p>
    `;
    charactersContainer.appendChild(character);
    character.addEventListener("click", (event) => {
      const selectedCharacter = event.currentTarget.dataset.index;
      updateCharts(selectedCharacter);
    });
  }
};

const updateCharts = (selectedCharacter) => {
  radarChart.setOption({
    series: [
      {
        name: charactersData[selectedCharacter].name,
        type: "radar",
        data: [
          {
            value: Object.values(charactersData[selectedCharacter].radar_chart),
          },
        ],
      },
    ],
  });

  let uniqueSankeyData = [];
  const sources = charactersData[selectedCharacter].sankey_data.map(
    (data) => data.source
  );
  const targets = charactersData[selectedCharacter].sankey_data.map(
    (data) => data.target
  );
  uniqueSankeyData = uniqueSankeyData.concat(sources);
  uniqueSankeyData = uniqueSankeyData.concat(targets);
  uniqueSankeyData = [...new Set(uniqueSankeyData)];
  sankeyChart.setOption({
    series: {
      data: uniqueSankeyData.map((data) => ({ name: data })),
      links: charactersData[selectedCharacter].sankey_data,
    },
  });

  calendarChart.setOption({
    series: {
      type: "heatmap",
      coordinateSystem: "calendar",
      data: charactersData[selectedCharacter].victories,
    },
  });

  pieChart.setOption({
    series: {
      data: charactersData[selectedCharacter].tournaments,
    },
  });
};

window.addEventListener("resize", () => {
  pieChart.resize();
  radarChart.resize();
  calendarChart.resize();
  sankeyChart.resize();
});

window.addEventListener("load", async () => {
  try {
    const request = await fetch("./data.json");
    const data = await request.json();

    charactersData = data.wrestlers;

    createCharactersUI(charactersData);
    updateCharts(0);
  } catch (error) {
    console.error(error);
  }
});
