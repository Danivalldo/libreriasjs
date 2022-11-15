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
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  });
};

export const setupPerformDelete = async (element) => {
  element.addEventListener("click", async () => {
    try {
      const response = await fetch(`./api/2`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      });
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  });
};
