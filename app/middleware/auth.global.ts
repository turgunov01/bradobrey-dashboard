export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === "/login") {
    return;
  }

  const sessionStore = useSessionStore();

  await sessionStore.ensureLoaded();

  if (!sessionStore.isAuthenticated) {
    return navigateTo("/login");
  }
});
