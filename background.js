chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.includes("youtube.com/watch")) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: () => {
        const url = new URL(window.location.href);
        const videoId = url.searchParams.get("v");
        const playlistId = url.searchParams.get("list");
        const start = url.searchParams.get("t") || url.searchParams.get("start");

        let embedUrl = "";

        if (playlistId && videoId) {
          // Video in Playlist
          embedUrl = `https://www.youtube.com/embed/${videoId}?list=${playlistId}&rel=0`;
        } else if (videoId) {
          // Video only
          embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;
        }

        if (start && embedUrl) {
          embedUrl += `&start=${start}`;
        }

        if (embedUrl) {
          window.location.replace(embedUrl);
        }
      }
    });
  }
});