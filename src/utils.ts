interface uploadImageRes {
  ok: boolean;
  url: string;
}
export const uploadImage = async (image: File): Promise<uploadImageRes> => {
  const formData = new FormData();
  formData.append("image", image);
  const res = await (
    await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    })
  ).json();
  return { ok: res.ok, url: res.result };
};
