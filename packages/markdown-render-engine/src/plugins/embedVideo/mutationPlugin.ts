import { MutationPluginArgs } from "@kyma-project/documentation-component";

const platforms: string[] = [
  "youtube",
  "vimeo",
  "videopress",
  "twitch",
  "twitchlive",
  "niconico",
];

function extractVideo(video: string): string {
  const keywords = platforms.join("|");
  const re = new RegExp(`\(${keywords}\):\(\.\*\)`, "i");

  const processValue = video.match(re);
  if (processValue && processValue[2]) {
    const type = processValue[1].trim();
    const link = processValue[2].trim();
    return `<div video-link="${link}" video-type="${type}"></div>`;
  }
  return video;
}

export function fn(source: string) {
  const INLINE_CODE_MD_REGEX = /(`)(.*?)\1/g;
  return source.replace(INLINE_CODE_MD_REGEX, (substring: string) => {
    INLINE_CODE_MD_REGEX.lastIndex = 0;
    const matched = INLINE_CODE_MD_REGEX.exec(substring);
    if (matched && matched[2]) {
      return extractVideo(matched[2]);
    }
    return substring;
  });
}

export const embedVideoMutationPlugin = ({
  source,
}: MutationPluginArgs): string =>
  fn((source.content || source.rawContent) as string);
