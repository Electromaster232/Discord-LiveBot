const electron = require('electron');
const {app, BrowserWindow} = electron;
const path = require('path');
const url = require('url');
const pack = require('./package.json');

let win;

function createWindow() {
  win = new BrowserWindow({width: 1200, height: 650, frame: false, icon: path.join(__dirname, 'images/kiwimascoticnborders.png')});
  win.setOverlayIcon('images/statuses/offline.png', 'Offline');
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  win.on('closed', () => {
    win = null
  });
}

app.on('ready', createWindow);

global.BWReport = function(name){
    return win;
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  };
});
