import { readdirSync } from "node:fs";
import path from "node:path";
import { audio } from "@/config/wedding";

export interface Track {
  src: string;
  title: string;
}

const AUDIO_EXT = /\.(mp3|m4a|aac|ogg|opus|wav)$/i;

function prettify(file: string): string {
  const name = file.replace(AUDIO_EXT, "").replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/** Lists the audio files in /public/audio (server-side), alphabetically. */
export function getTracks(): Track[] {
  let files: string[];
  try {
    files = readdirSync(path.join(process.cwd(), "public", "audio"));
  } catch {
    return [];
  }
  return files
    .filter((f) => AUDIO_EXT.test(f))
    .sort((a, b) => a.localeCompare(b))
    .map((f) => ({ src: `/audio/${encodeURIComponent(f)}`, title: audio.titles[f] ?? prettify(f) }));
}
