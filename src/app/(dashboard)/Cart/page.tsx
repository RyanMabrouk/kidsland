import getCart from "@/api/getCart";
import Content from "./ui/Content";

export default async function page() {
  const cart = await getCart();
  return (
    <div className="flex flex-col items-center justify-start">
      <h1 className="text-3xl font-bold text-red-300">Your Cart</h1>
      <Content />
    </div>
  );
}
