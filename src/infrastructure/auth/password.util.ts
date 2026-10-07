import crypto from "crypto";

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHmac("sha256", salt).update(password).digest("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const parts = storedHash.split(":");
    if (parts.length !== 2) return false;
    const [salt, expectedHash] = parts;
    const computedHash = crypto.createHmac("sha256", salt).update(password).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(computedHash), Buffer.from(expectedHash));
  } catch {
    return false;
  }
}
