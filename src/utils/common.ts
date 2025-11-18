export function cleanParams<T extends object>(params: T): Partial<T> {
  const cleaned: Partial<T> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      cleaned[key as keyof T] = value;
    }
  });

  return cleaned;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function getDayName(date: string, language?: string): string {
  const dateObj = new Date(date);
  const dayNames = {
    vi: [
      "CHỦ NHẬT",
      "THỨ HAI",
      "THỨ BA",
      "THỨ TƯ",
      "THỨ NĂM",
      "THỨ SÁU",
      "THỨ BẢY",
    ],
    en: [
      "SUNDAY",
      "MONDAY",
      "TUESDAY",
      "WEDNESDAY",
      "THURSDAY",
      "FRIDAY",
      "SATURDAY",
    ],
  };

  const lang = language === "en" ? "en" : "vi";
  return dayNames[lang][dateObj.getDay()];
}

export function formatDateWithDashes(date: string): string {
  const dateObj = new Date(date);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day} - ${month} - ${year}`;
}
