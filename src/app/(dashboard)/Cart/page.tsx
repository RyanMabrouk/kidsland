import Content from "./ui/Content";

export default async function page() {
  return (
      <div className="flex h-full flex-col items-center justify-start overflow-y-scroll bg-gray-100">
        <Content />
      </div>
  );
}
