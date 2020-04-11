const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");

let window = null;
let isPinned = false;

// Wait until the app is ready
app.once("ready", () => {
  // Create a new window
  window = new BrowserWindow({
    useContentSize: true,
    // Set the initial width to 500px
    width: 1280,
    // Set the initial height to 400px
    height: 400,
    // set the title bar style
    titleBarStyle: "hiddenInset",
    // set the background color to black
    //backgroundColor: "#000",
    // make the background transparent
    transparent: true,
    // don't show a frame around it
    frame: false,
    // Don't show the window until it's ready, this prevents any white flickering
    show: false
    // allows resizing pinWindow
    // resizable: true
  });

  window.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  window.once("ready-to-show", () => {
    window.show();
    // window.setSize();
  });

  ipcMain.on("pin-window", (event, arg) => {
    isPinned = !isPinned;
    window.setAlwaysOnTop(isPinned);
  });
});

ipcMain.on("close-window", (event, arg) => {
  app.quit();
});
