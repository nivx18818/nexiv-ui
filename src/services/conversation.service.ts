import httpRequest from "@/utils/http-request.util"
import type { UUID } from "crypto";

export const create = async () => {
  const res = await httpRequest.post("/c");
  return res;
}

export const getById = async (id: UUID) => {
  const res = await httpRequest.get(`/c/${id}`);
  return res;
}
