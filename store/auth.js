// store/auth.js
export const state = () => ({
  user: null,
});

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
};

export const actions = {
  async signIn({ commit }, { email, password }) {
    const { user, error } = await this.$supabase.auth.signIn({
      email,
      password,
    });
    if (error) throw error;
    commit("setUser", user);
    return redirect("/");
  },
  async signOut({ commit }) {
    await this.$supabase.auth.signOut();
    commit("setUser", null);
  },
  async fetchUser({ commit }) {
    const user = this.$supabase.auth.user();
    commit("setUser", user);
  },
};
