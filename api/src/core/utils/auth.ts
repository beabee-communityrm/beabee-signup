import crypto from 'crypto';
import Password from '@models/Password';

// Used to create a long salt for each individual user
// returns a 256 byte / 512 character hex string
export function generateSalt(): Promise<string> {
  return new Promise((resolve) => {
    crypto.randomBytes(256, function (ex, salt) {
      resolve(salt.toString('hex'));
    });
  });
}

// Hashes passwords through sha512 1000 times
// returns a 512 byte / 1024 character hex string
export function hashPassword(
  password: string,
  salt: string,
  iterations: number
): Promise<string> {
  return new Promise((resolve) => {
    crypto.pbkdf2(
      password,
      salt,
      iterations,
      512,
      'sha512',
      function (err, hash) {
        resolve(hash.toString('hex'));
      }
    );
  });
}

// Utility function generates a salt and hash from a plain text password
export async function generatePassword(password: string): Promise<Password> {
  const salt = await generateSalt();
  const hash = await hashPassword(password, salt, 50000);
  return {
    salt,
    hash,
    iterations: 50000,
  };
}
