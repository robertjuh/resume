import { EngineeringNote } from '../models/content';

// Add only owner-written, reviewed notes. Candidate topics live in CONTENT_REVIEW.md.
// An empty collection keeps the entire section out of the public interface.
export const engineeringNotes: readonly EngineeringNote[] = [];
