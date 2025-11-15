export function cleanParams<T extends object>(params: T): Partial<T> {
  const cleaned: Partial<T> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      cleaned[key as keyof T] = value;
    }
  });

  return cleaned;
}
