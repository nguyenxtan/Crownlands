import path from 'node:path';

// Permanent local origin. Browser saves belong to this exact host and port.
export const HOST = '127.0.0.1';
export const PORT = 4173;
export const URL = `http://${HOST}:${PORT}`;
export const PROJECT_ROOT = path.resolve(import.meta.dirname, '..');
export const SERVICE_LABEL = 'local.crownlands.server';
