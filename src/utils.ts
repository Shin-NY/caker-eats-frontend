interface uploadImageRes {
  ok: boolean;
  url: string;
}
export const uploadImage = async (image: File): Promise<uploadImageRes> => {
  const formData = new FormData();
  formData.append("image", image);
  const res = await (
    await fetch(getServerUrl({}) + "/upload", {
      method: "POST",
      body: formData,
    })
  ).json();
  return { ok: res.ok, url: res.result };
};

export const getServerUrl = ({ ws }: { ws?: boolean }): string => {
  if (ws) {
    return process.env.NODE_ENV === "production"
      ? "wss://caker-eats-backend.onrender.com"
      : "ws://localhost:4000";
  }
  return process.env.NODE_ENV === "production"
    ? "https://caker-eats-backend.onrender.com"
    : "http://localhost:4000";
};
