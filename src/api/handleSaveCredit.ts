"use server";

export default async function handleSaveCredit(formData: FormData) {
  const { name, email, address, phone } = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    address: formData.get("address") as string,
    phone: formData.get("phone") as string,
  };
  console.log({ name, email, address, phone });
  return;
}
