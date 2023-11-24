import { ChangeEvent, Dispatch, SetStateAction } from "react";

export const setSingleFile = (
  event: ChangeEvent<HTMLInputElement>,
  setFileState: Dispatch<SetStateAction<Blob | null>>
) => {
  event.preventDefault();
  const { target } = event;

  if (!target.files) return;

  const file = target.files[0];

  setFileState(file);
};
