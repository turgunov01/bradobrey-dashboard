export default defineNuxtRouteMiddleware(async () => {
  const sessionStore = useSessionStore();

  await sessionStore.ensureLoaded();

  if (sessionStore.isAuthenticated) {
    return navigateTo("/");
  }
});
