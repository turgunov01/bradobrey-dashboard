export default defineNuxtRouteMiddleware(async (to) => {
  const sessionStore = useSessionStore();

  await sessionStore.ensureLoaded();

  const isAuthLocal =
    process.client && localStorage.getItem("isAuthenticated") === "true";

  if (!sessionStore.isAuthenticated && !isAuthLocal) {
    return navigateTo("/login");
  }

  if (sessionStore.isAuthenticated && to.path === "/login") {
    return navigateTo("/");
  }
});
