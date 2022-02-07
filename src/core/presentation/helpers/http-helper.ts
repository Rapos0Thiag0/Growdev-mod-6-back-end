import { Response } from "express";

export const sucess = (res: Response, data: any) => {
  return res.status(200).json(data);
};

export const badRequest = (res: Response, message?: string) => {
  return res.status(400).json({ error: message ?? "INVALID_DATA" });
};

export const notFound = (res: Response, message?: string) => {
  return res.status(404).json({ error: message ?? "DATA_NOT_FOUND" });
};

export const serverError = (res: Response, error: Error) => {
  return res
    .status(500)
    .json({ error: "INTERNAL_SERVER_ERROR", message: error.message });
};
