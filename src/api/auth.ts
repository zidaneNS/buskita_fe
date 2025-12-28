import { SignInDto } from "@/lib/type/user";
import { DefaultResponse } from "./type";
import { publicReq } from "./api";

export async function signin(data: SignInDto): Promise<string | undefined> {
  try {
    const res = await publicReq.get<DefaultResponse<string>>('/signin', {
      data
    });

    if (res.data.payloads) return res.data.payloads;
  } catch (err) {
    console.error(err);
  }
}