export default function checkUser() {
  const user_id = useSupabaseUser().value?.id;
  if (user_id === undefined || user_id === null) {
    alert("User is not logged in.");
    return;
  }
}
