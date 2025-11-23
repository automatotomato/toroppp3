export function getYouTubeEmbedUrl(url: string): string {
  if (!url) return '';

  const videoId = extractYouTubeVideoId(url);
  if (!videoId) return '';

  return `https://www.youtube.com/embed/${videoId}`;
}

function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([^?]+)/,
    /(?:https?:\/\/)?youtu\.be\/([^?]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}
