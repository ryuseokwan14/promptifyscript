export const SESSION_COOKIE_NAME = "promptify_session";

const SESSION_SECRET =
  process.env.SESSION_SECRET || "promptify-secure-master-secret-superadmin121-2026";

async function getHmacKey(): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(SESSION_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export interface SessionPayload {
  identifier: string;
  role: "SUPERADMIN" | "CREATOR";
  createdAt: number;
}

export async function signSessionToken(payload: Omit<SessionPayload, "createdAt">): Promise<string> {
  const fullPayload: SessionPayload = {
    ...payload,
    createdAt: Date.now(),
  };

  const encoder = new TextEncoder();
  const jsonStr = JSON.stringify(fullPayload);
  const base64Data = btoa(jsonStr);

  const key = await getHmacKey();
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(base64Data));

  const signatureHex = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${base64Data}.${signatureHex}`;
}

export async function verifySessionToken(token?: string | null): Promise<SessionPayload | null> {
  if (!token) return null;

  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [base64Data, signatureHex] = parts;
    const key = await getHmacKey();
    const encoder = new TextEncoder();

    const hexMatches = signatureHex.match(/.{1,2}/g);
    if (!hexMatches) return null;

    const signatureBytes = new Uint8Array(hexMatches.map((byte) => parseInt(byte, 16)));

    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes,
      encoder.encode(base64Data)
    );

    if (!isValid) return null;

    const jsonStr = atob(base64Data);
    const parsed = JSON.parse(jsonStr) as SessionPayload;
    return parsed;
  } catch {
    return null;
  }
}
