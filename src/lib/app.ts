import type { Feeling } from "@app.types/app/record";

export function getFeelingScore(data: Feeling) {
  const { positive, negative } = data;

  const score = 50 + positive - negative;

  let feeling = "normal";
  let text = "";

  if (score <= 40) {
    feeling = "bad";
    text = "사용자님과 사이가 가깝지 않은거 같네요.";
  } else if (40 < score && score <= 65) {
    feeling = "normal";
    text = "사용자님과 평범한 사이인 것 같아요.";
  } else {
    feeling = "good";
    text = "누군가 높은 호감도를 가지고 계신 것 같아요!";
  }

  return { score, feeling, text };
}
