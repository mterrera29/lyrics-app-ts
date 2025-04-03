import { z } from 'zod';
import { SongSchema } from '../schema/songSchema';

export type Song = z.infer<typeof SongSchema>;
