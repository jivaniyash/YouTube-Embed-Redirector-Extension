function parseTimeToSeconds(t) {
  if (!t) return null;

  // If just a number (seconds), return as is
  if (/^\d+$/.test(t)) return parseInt(t);

  // Match formats like 1h2m3s, 2m3s, 90s
  const regex = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/;
  const match = t.match(regex);

  if (!match) return null;

  const hours = parseInt(match[1]) || 0;
  const minutes = parseInt(match[2]) || 0;
  const seconds = parseInt(match[3]) || 0;

  return hours * 3600 + minutes * 60 + seconds;
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url.includes("youtube.com/watch")) {
    const url = new URL(tab.url);
    const videoId = url.searchParams.get("v");
    const playlistId = url.searchParams.get("list");

    // parse t=1h2m3s or t=120 or start=120
    const rawT = url.searchParams.get("t");
    const rawStart = url.searchParams.get("start");
    const end = url.searchParams.get("end");

    const start = parseTimeToSeconds(rawT) || parseInt(rawStart) || null;

    let embedUrl = "";

    if (playlistId && videoId) {
      // Video in Playlist
      embedUrl = `https://www.youtube.com/embed/${videoId}?list=${playlistId}&rel=0`;
    } else if (videoId) {
      // Video only
      embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0`;
    }

    if (start !== null) {
      embedUrl += `&start=${start}`;
    }

    if (end) {
      embedUrl += `&end=${end}`;
    }

    if (embedUrl) {
      embedUrl += "&autoplay=1";
      chrome.tabs.update(tabId, { url: embedUrl });
    }
  }
});