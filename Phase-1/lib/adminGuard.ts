import { cookies } from 'next/headers';
import { ADMIN_COOKIE, isValidSession } from './adminAuth';

/** true when the request comes from a logged-in admin */
export async function isAdminRequest(): Promise<boolean> {
  return isValidSession((await cookies()).get(ADMIN_COOKIE)?.value);
}
