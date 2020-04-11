const { ipcRenderer } = require("electron");
// import { RamData, CpuData } from "./scripts/chart.js";
const { RamData, CpuData } = require("./scripts/chart.js");

const monitors = [];

function pinWindow() {
  ipcRenderer.send("pin-window");
}

function toggleGrayscale() {
  monitors.forEach(m => {
    m.toggleGrayscale();
  });
}

function closeWindow() {
  ipcRenderer.send("close-window");
}

function addMonitor(m) {
  console.log(monitors.length);
  monitors[monitors.length] = m;
}

$(() => {
  addMonitor(new RamData("#ram"));
  addMonitor(new CpuData("#cpu"));
  // let ram = new RamData("#ram");
  // let cpu = new CpuData("#cpu");
});
