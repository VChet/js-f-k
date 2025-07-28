import dayjs from "dayjs";

import("dayjs/locale/ru");

export function formatDate(payload: dayjs.ConfigType, format: string): string {
  return dayjs(payload).locale("ru").format(format);
}
