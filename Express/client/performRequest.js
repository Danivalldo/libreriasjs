import { getToken } from "./setupLogin";

export const setupPerformRequest = async (element) => {
  element.addEventListener("click", async () => {
    try {
      const response = await fetch("./api", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  });
};
