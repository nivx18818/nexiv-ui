import httpRequest from "@/utils/http-request.util";

export const create = async () => {
  const res = await httpRequest.post("/c");
  return res;
};

export const getById = async (id: string) => {
  const res = await httpRequest.get(`/c/${id}`);
  return res;
};

export const sendMessage = async (id: string, message: string) => {
  const res = await httpRequest.post(`/c/${id}`, { message });
  return res;
};
