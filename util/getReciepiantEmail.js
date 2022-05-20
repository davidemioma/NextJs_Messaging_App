export const getRecipientsEmail = (users, userLoggedIn) =>
  users?.filter((user) => user !== userLoggedIn)[0];
