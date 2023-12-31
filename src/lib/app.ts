export const acceptableExt = ["wav", "mp3", "m4a"];

export function checkAcceptable(fname: string) {
  const fileExtIdx = fname.lastIndexOf(".");
  const fileExt = fname.slice(fileExtIdx + 1).toLowerCase();

  return acceptableExt.some((ext) => ext === fileExt);
}

export function getFeelingScore(score: number) {
  let feeling = "Not Bad";
  let text = "";

  if (score <= 40) {
    feeling = "Bad";
    text = "사용자님과 사이가 가깝지 않은거 같네요.";
  } else if (40 < score && score <= 65) {
    feeling = "Not Bad";
    text = "사용자님과 평범한 사이인 것 같아요.";
  } else {
    feeling = "Good";
    text = "누군가 높은 호감도를 가지고 계신 것 같아요!";
  }

  return { feeling, text };
}

export function convertSeconds(seconds: number, locale: "en" | "ko" = "en") {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const hT = locale === "en" ? "h" : "시간";
  const mT = locale === "en" ? "m" : "분";
  const sT = locale === "en" ? "s" : "초";

  const hourString = hours > 0 ? `${hours}` : "";
  const minuteString = minutes > 0 ? `${minutes}` : "";
  const secondString = remainingSeconds > 0 ? `${remainingSeconds}` : "";

  if (hours > 0) {
    return `${hourString}${hT} ${minuteString && ` ${minuteString}${mT}`}${
      secondString && ` ${secondString}${sT}`
    }`;
  } else if (!hours && minutes > 0) {
    return `${minuteString}${mT}${secondString && ` ${secondString}${sT}`}`;
  }

  return `${secondString || "0"}${sT}`;
}

export function getProgressFromSeq(seq: number) {
  switch (seq) {
    case 0:
      return { progress: 0, text: "파일을 변환 중이에요!" };
    case 1:
      return { progress: 20, text: "음성을 분리 중이에요!" };
    case 2:
      return { progress: 40, text: "음성인식 중이에요!" };
    case 3:
      return { progress: 60, text: "감정을 분석 중이에요!" };
    case 4:
      return { progress: 80, text: "내용을 요약 중이에요!" };
    default:
      return { progress: 0, text: "" };
  }
}
