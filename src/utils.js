// Shared identity + formatting utilities

export async function hashPhone(normalized) {
  const encoder = new TextEncoder();
  const data = encoder.encode(normalized);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function normalizePhone(raw) {
  let p = raw.replace(/\s/g, '');
  if (p.startsWith('+254')) p = '0' + p.slice(4);
  else if (p.startsWith('254')) p = '0' + p.slice(3);
  return p;
}

export function validatePhone(raw) {
  const normalized = normalizePhone(raw);
  return /^(07|01)\d{8}$/.test(normalized);
}

export function getDisplayName(fullName) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0]}.`;
}

export function getInitials(fullName) {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
