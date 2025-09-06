import type { MessageType, Conversation } from "@/types/conversation";
import httpRequest from "@/utils/http-request.util";

export const create = async () => {
  const res = await httpRequest.post<Conversation>("/c");
  return res;
};

export const getById = async (id: string) => {
  const res = await httpRequest.get<Conversation>(`/c/${id}`);
  return res;
};

export const sendMessage = async (id: string, message: string) => {
  const res = await httpRequest.post<MessageType[]>(`/c/${id}`, { message });
  return res;
};
