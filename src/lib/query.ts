import qs from "query-string";

type query = Record<string, any>;

export const queryWrapper =
  <T = query>(url: string) =>
  (_query?: T) =>
    _query ? `${url}?${qs.stringify(_query)}` : url;
