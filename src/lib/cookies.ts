// src/lib/cookies.ts
import Cookies from 'js-cookie';

// Set a cookie with optional expiry in days
export const setCookie = (name: string, value: string, expiry?: number) => {
  if (expiry) {
    Cookies.set(name, value, { expires: expiry, sameSite: 'strict' });
  } else {
    Cookies.set(name, value, { sameSite: 'strict' });
  }
};

// Get a cookie by name
export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

// Remove a cookie by name
export const removeCookie = (name: string) => {
  Cookies.remove(name);
};

// Check if a cookie exists
export const hasCookie = (name: string): boolean => {
  return !!getCookie(name);
};

// Set JSON data in a cookie
export const setJsonCookie = (name: string, value: any, expiry?: number) => {
  setCookie(name, JSON.stringify(value), expiry);
};

// Get JSON data from a cookie
export const getJsonCookie = <T>(name: string): T | null => {
  const cookie = getCookie(name);
  if (!cookie) return null;
  
  try {
    return JSON.parse(cookie) as T;
  } catch (e) {
    console.error(`Failed to parse cookie ${name}:`, e);
    return null;
  }
};