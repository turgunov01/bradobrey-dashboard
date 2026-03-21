globalThis.__timing__.logStart('Load chunks/build/guest-only-Bx1LhXv_');import { N as executeAsync } from '../_/nitro.mjs';
import { aD as defineNuxtRouteMiddleware, f as useSessionStore, n as navigateTo } from './server.mjs';
import 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:util';
import 'node:path';
import 'node:process';
import 'node:tty';
import 'node:fs';
import '../routes/renderer.mjs';
import '../virtual/_commonjsHelpers.mjs';
import 'node:stream';
import '../_/shared.cjs.prod.mjs';

const guestOnly = defineNuxtRouteMiddleware(async () => {
  let __temp, __restore;
  const sessionStore = useSessionStore();
  [__temp, __restore] = executeAsync(() => sessionStore.ensureLoaded()), await __temp, __restore();
  if (sessionStore.isAuthenticated) {
    return navigateTo("/");
  }
});

export { guestOnly as default };;globalThis.__timing__.logEnd('Load chunks/build/guest-only-Bx1LhXv_');
//# sourceMappingURL=guest-only-Bx1LhXv_.mjs.map
