import { Offer, OfferProps } from "./Offer";

export function OffersContainer() {
  const offers: OfferProps[] = [
    {
      name: "Baby's first purchase",
      image_url: "/home/offers/offer-1.jpg",
      variant: "slate",
      description:
        "While you enjoy waiting for your baby, we take care of everything you need after her arrival in the world.",
    },
    {
      name: "Loyalty program",
      image_url: "/home/offers/offer-2.jpg",
      variant: "white",
      description:
        "Become part of the Kidsland family and take advantage of the benefits we have for all our members.",
    },
  ];
  return (
    <div className="flex flex-row items-center justify-center gap-10">
      {offers.map((e, i) => (
        <Offer key={i} {...e} />
      ))}
    </div>
  );
}
