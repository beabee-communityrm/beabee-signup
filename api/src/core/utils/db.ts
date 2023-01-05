import { QueryFailedError } from 'typeorm';

interface PgError {
  code: string;
  detail: string;
}

export function isDuplicateIndex(error: unknown, key: string): boolean {
  if (error instanceof QueryFailedError) {
    const pgError = error as unknown as PgError;
    const keyTest = new RegExp(`^Key \\("?${key}"?\\).* already exists`);
    if (pgError.code === '23505' && keyTest.test(pgError.detail)) {
      return true;
    }
  }
  return false;
}
