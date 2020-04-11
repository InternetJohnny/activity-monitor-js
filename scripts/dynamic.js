const { ipcRenderer } = require("electron");
const os = require("os-utils");
const chart = require("./scripts/chart.js");
// import { chart } from "./scripts/chart.js";

function pinWindow() {
  ipcRenderer.send("pin-window");
}

function closeWindow() {
  ipcRenderer.send("close-window");
}

// Chart class
let ChartInstance = class {
  constructor(element) {
    this.donut = null;
    this.ramData;
    this.setRamData();
    this.drawChart(element);
  }

  getRamData() {
    let ram_free = Math.round(os.freememPercentage() * 100);
    let ram_used = 100 - ram_free;
    return [ram_used, ram_free];
  }

  setRamData() {
    this.ramData = this.getRamData();
  }

  updateDatasets() {
    console.log("updating:" + this.ramData[0] + "%");
    this.donut.data.datasets[0].data = this.getRamData();
    this.donut.update();
    this.setRamData();
  }

  drawChart(c) {
    this.donut = new Chart($(c), {
      type: "doughnut",
      data: {
        labels: ["Ram Used (%)", "Ram Free (%)"],
        datasets: [
          {
            data: this.ramData,
            backgroundColor: ["rgba(55, 255, 140, 1)", "rgba(255, 255, 255, 1)"]
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        title: {
          display: false
        },
        legend: {
          display: false
        }
      }
    });
    setInterval(() => {
      this.updateDatasets();
    }, 1000);
  }
};

// What runs
$(() => {
  let ram = new ChartInstance("#chart_ram");
});
