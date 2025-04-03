import { z } from 'zod';

export const SongSchema = z.object({
  _id: z.string(),
  id: z.string(),
  artist: z.string(),
  lyrics: z.string(),
  genre: z.string(),
  chords: z.string(),
  scrollSpeedLyrics: z.number(),
  scrollSpeedChords: z.number(),
  fontSizeChords: z.number(),
  title: z.string(),
  fontSizeLyrics: z.number(),
});

export const SongsArray = z.array(SongSchema);
