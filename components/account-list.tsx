import Image from "next/image";

const accounts = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
    currency: "Nigerian Naira",
    balance: "N 403,239",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
    currency: "Botswana Pula",
    balance: "P 3,239",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
    currency: "Nok Coin",
    balance: "7,923 NOK",
  },
];

export default function AccountList() {
  return (
    <ul role="list" className="flex-auto divide-y divide-gray-100 w-full">
      {accounts.map((account) => (
        <li key={account.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <Image
              className="h-10 w-10 flex-none rounded-full bg-gray-50"
              src="/logo.png"
              alt=""
              width={10}
              height={10}
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-white">
                {account.currency}
              </p>
              {/* <p className="mt-1 truncate text-xs leading-5 text-white">
                {account.email}
              </p> */}
            </div>
          </div>
          <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-white font-semibold">
              {account.balance}
            </p>
            {/* <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs leading-5 text-white">Online</p>
            </div> */}
          </div>
        </li>
      ))}
    </ul>
  );
}
