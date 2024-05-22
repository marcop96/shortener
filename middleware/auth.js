export default function ({ store, redirect }) {
  if (!store.state.auth.user) {
    return redirect("/login");
  } else {
    return redirect("/");
  }
}
