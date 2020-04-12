const { ipcRenderer } = require("electron");
const $ = require("jquery");
const { RamData, CpuData } = require("./scripts/chart-instance.js");

const monitors = [];

function pinWindow() {
  ipcRenderer.send("pin-window");
}

function toggleGrayscale() {
  monitors.forEach(m => {
    m.toggleGrayscale();
  });
}

function toggleInterface() {
  monitors.forEach(m => {
    m.toggleInterface();
  });
}

function closeWindow() {
  ipcRenderer.send("close-window");
}

function addMonitor(m) {
  monitors[monitors.length] = m;
}

// Instantiate Monitors
$(() => {
  addMonitor(new RamData("#ram"));
  addMonitor(new CpuData("#cpu"));
});
