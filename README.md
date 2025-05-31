# Youtube-Embed-Redirector-Extension
This project helps a workaround for YouTube viewers to redirect the YouTube default video view to the Embed view (**Full Screen**) on Browsers. This helps users avoid any distractions from YouTube suggestions or ads. This extension works as described only with **YouTube Videos and Playlists** & does not affect YouTube Shorts Videos. 

### Demo
![Demo](demo/screen-capture.gif)

### Steps to activate the Extension
1. Pull this repository or Download files as a Zip file & unzip it.
2. Open the Browser's Extension Page. For Google Chrome - Please type in the URL bar - `chrome://extensions`.
3. Turn on `Developer Mode` toggle button, if turned off.  
4. Click on the `Load Unpacked` Button.
5. Choose the directory where this git repository is downloaded or cloned.
6. Ignore any errors in the extension page.

### Usage
1. Open the `https://www.youtube.com/` and choose the video you want to play
2. Browser tab will Redirect YouTube watch page to embed video format in full screen view.

### Additional Configuration
- Currently, there is an additional URL parameter - `rel=0` added to the [background.js](background.js) script, which shows the video suggestions only from the current YouTube Channel during **Play/Pause Mode** & **End of Video**. Check out [Youtube API](https://developers.google.com/youtube/player_parameters#release_notes_08_23_2018) documentation for additional configuration.