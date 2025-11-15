import { API_PATH } from "@/constans/common";
import { http } from "../http";
import { AlbumDomainData } from "@/types/album";

export const getAlbum = async (domain: string) => {
  const response = await http.get<AlbumDomainData>(API_PATH.GET_ALBUM(domain));
  return response.data;
};
