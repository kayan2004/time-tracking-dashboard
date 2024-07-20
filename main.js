let list = document.querySelector(".list");
let listItems = list.querySelectorAll(".item");
let cardContainers = document.querySelectorAll(".card_container");

async function fetchData() {
  try {
    const response = await fetch("/data.json");
    if (!response.ok) {
      console.log("Oops! Something went wrong.");
      return null;
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
    return null;
  }
}

var displayData = (timeframe) => {
  fetchData().then((data) => {
    console.log("Data fetched:", data);
    const fetchedData = data;
    let i = 0;
    fetchedData.forEach((element) => {
      let currentContainer = cardContainers[i];
      let current = currentContainer.querySelector(".current");
      let previous = currentContainer.querySelector(".previous");
      console.log(timeframe);
      if (timeframe === "Daily") {
        current.textContent = element.timeframes.daily.current + "hrs";
        previous.textContent =
          "Last Week -" + element.timeframes.daily.previous + "hrs";
      } else if (timeframe === "Weekly") {
        current.textContent = element.timeframes.weekly.current + "hrs";
        previous.textContent =
          "Last Week -" + element.timeframes.weekly.previous + "hrs";
      } else if (timeframe === "Monthly") {
        current.textContent = element.timeframes.monthly.current + "hrs";
        previous.textContent =
          "Last Week -" + element.timeframes.monthly.previous + "hrs";
      }

      ++i;
    });
  });
};

listItems.forEach((item) => {
  console.log("clicked");
  item.addEventListener("click", () => {
    displayData(item.textContent);
  });
});
