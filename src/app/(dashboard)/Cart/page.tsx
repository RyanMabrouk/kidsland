import CartHydration from "@/provider/CartHydration";
import Content from "./ui/Content";

export default async function page() {
  return (
    <CartHydration>
      <div className="flex h-full flex-col items-center justify-start overflow-y-scroll bg-gray-100">
        <Content />
      </div>
    </CartHydration>
  );
}
