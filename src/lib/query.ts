import qs from "query-string";

type query = Record<string, any>;

export function queryWrapper<T = query>(url: string) {
  return function (_query?: T) {
    return _query ? `${url}?${qs.stringify(_query)}` : url;
  };
}
