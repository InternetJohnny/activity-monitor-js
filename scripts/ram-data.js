const ChartInstance = require("./scripts/chart.js").ChartInstance;

let RamData = class extends ChartInstance {
  constructor(element) {
    super(element);
  }

  getData() {
    let ram_free = Math.round(os.freememPercentage() * 100);
    let ram_used = 100 - ram_free;
    return [ram_used, ram_free];
  }
};

module.exports.RamData = RamData;
