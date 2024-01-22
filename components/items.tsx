import { ListBulletIcon, PhoneIcon, StarIcon } from "@heroicons/react/20/solid";

const items = [
  {
    name: "Broccoli",
    title: "Great for eye health, heart health, and disease prevention",
    role: "Vegetable",
    conditions: ["Weight Loss", "Vegan"],
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://cdn.britannica.com/25/78225-050-1781F6B7/broccoli-florets.jpg",
  },
  {
    name: "Blueberries",
    title: "Packed with antioxidants and vitamin C",
    role: "Fruit",
    conditions: ["Immune Boost", "Antioxidant"],
    email: "johnsmith@example.com",
    telephone: "+1-202-555-1234",
    imageUrl: "https://cdn.britannica.com/39/7139-050-94F79BFB/Blueberries.jpg",
  },
  {
    name: "Sweet Potato",
    title: "High in fiber and beta-carotene",
    role: "Carb",
    conditions: ["Digestive Health", "Vision"],
    email: "davidwilson@example.com",
    telephone: "+1-202-555-6543",
    imageUrl:
      "https://cdn.britannica.com/21/149021-050-526314E7/Sweet-Potatoes.jpg",
  },
  {
    name: "Quinoa",
    title: "High in protein and essential amino acids",
    role: "Carb",
    conditions: ["Vegetarian", "Gluten-Free"],
    email: "laurajones@example.com",
    telephone: "+1-202-555-5678",
    imageUrl: "https://cdn.britannica.com/15/196815-050-526314E7/Quinoa.jpg",
  },
  {
    name: "Salmon",
    title: "Rich in omega-3 fatty acids for brain health",
    role: "Protein",
    conditions: ["Heart Health", "Omega-3"],
    email: "mikesmith@example.com",
    telephone: "+1-202-555-9876",
    imageUrl: "https://cdn.britannica.com/39/59939-050-A888632D/Salmon.jpg",
  },
  {
    name: "Spinach",
    title: "Packed with iron and vitamins",
    role: "Vegetable",
    conditions: ["Anemia", "Healthy Bones"],
    email: "susanbrown@example.com",
    telephone: "+1-202-555-4321",
    imageUrl: "https://cdn.britannica.com/39/76939-050-A888632D/Spinach.jpg",
  },
];

export default function Items() {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {items.map((item) => (
        <li
          key={item.email}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            <img
              className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
              src={item.imageUrl}
              alt=""
            />
            <h3 className="mt-6 text-sm font-medium text-gray-900">
              {item.name}
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-gray-500">{item.title}</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {item.role}
                </span>
              </dd>
              <dd className="mt-3">
                {item.conditions.map((condition, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center rounded-full bg-orange-50 px-2 py-1 text-xs font-medium text-orange-700 ring-1 ring-inset ring-orange-600/20 mx-2"
                  >
                    {condition}
                  </span>
                ))}
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={`mailto:${item.email}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <StarIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Save
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href={`tel:${item.telephone}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                >
                  <ListBulletIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  Recipes
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
