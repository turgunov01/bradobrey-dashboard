import { defineStore } from "pinia";
import type {
  BarberProfile,
  BarberUser,
  LoginPayload,
} from "~~/shared/schemas";

export const useSessionStore = defineStore("session", {
  state: () => ({
    barber: null as BarberProfile | null,
    user: null as BarberUser | null,
    status: "idle" as "idle" | "loading" | "loaded",
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.user),
  },

  actions: {
    async ensureLoaded() {
      if (this.status === "loaded") {
        return { barber: this.barber, user: this.user };
      }

      this.status = "loading";

      try {
        const response = await useBarbersApi().me({ silent: true });

        this.barber = response?.barber ?? null;
        this.user = response?.user ?? null;
      } catch (e) {
        this.barber = null;
        this.user = null;
      } finally {
        this.status = "loaded";
      }

      return { barber: this.barber, user: this.user };
    },

    async login(payload: LoginPayload) {
      const response = await useBarbersApi().login(payload);

      if (response?.authenticated) {
        localStorage.setItem("isAuthenticated", "true");
      }

      await this.ensureLoaded();

      return response;
    },

    async logout(payload?: Record<string, unknown>) {
      try {
        await useBarbersApi().logout(payload);
      } finally {
        this.barber = null;
        this.user = null;
        this.status = "idle";
        localStorage.removeItem("isAuthenticated");
      }
    },

    setSession(payload: {
      barber: BarberProfile | null;
      user: BarberUser | null;
    }) {
      this.barber = payload.barber;
      this.user = payload.user;
      this.status = "loaded";
    },
  },
});
