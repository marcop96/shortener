export const handleRedirect = defineEventHandler(async (event) => {
  await sendRedirect(event, "/path/redirect/to", 302);
});
