export const formatterAuthorNome = (title: string): string => {
  return title.toLowerCase().trim().replace(/\n+/g, " ").replace(/\s+/g, "-");
};
