import getCart from "@/api/getCart";
import Content from "./ui/Content";

export default async function page() {
  const cart = await getCart();
  return (
    <div className="flex flex-col items-center justify-start bg-gray-100">
      <Content />
    </div>
  );
}
