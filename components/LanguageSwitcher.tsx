'use client';

import { useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export default function LanguageSwitcher({
  className,
}: {
  className?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();

  // Extract language from URL like "/en/page" -> "en"
  const currentLocale = pathname.split('/')[1] || 'en';

  const locales = [
    { code: 'en', name: 'ENGLISH' },
    { code: 'ru', name: 'РУССКИЙ' },
    { code: 'ro', name: 'ROMÂNǍ' },
  ];

  const onSelectChange = (nextLocale: string) => {
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

  return (
    <Select
      defaultValue={currentLocale}
      onValueChange={onSelectChange}
      disabled={isPending}
    >
      <SelectTrigger
        className='w-auto bg-transparent dark:bg-transparent border-none shadow-none focus:ring-0 focus:ring-offset-0 transition-colors hover:text-gray-400 dark:hover:text-gray-300 text-base font-medium text-gray-800 dark:text-gray-100 cursor-pointer leading-none !p-0 !m-0 !h-auto !min-h-0 inline-flex items-baseline gap-1 hover:bg-transparent dark:hover:bg-transparent [&>span]:!p-0 [&>span]:!m-0 [&>span]:leading-none [&_svg]:h-3 [&_svg]:w-3'
        aria-label='Change language'
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale.code} value={locale.code}>
            {locale.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

}

// ORIGINAL LanguageSwitcher code with no shadcn/ui components and lovely dropdown styling
// "use client";

// import { useTransition } from "react";
// import { useRouter, usePathname } from "next/navigation";

// export default function LanguageSwitcher() {
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();
//   const pathname = usePathname();

//   // Extract language from URL like "/en/page" -> "en"
//   const currentLocale = pathname.split("/")[1] || "en";

//   const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const nextLocale = e.target.value;
//     startTransition(() => {
//       router.replace(`/${nextLocale}`);
//     });
//   };

//   return (
//     <label className="border-2 border-gray-400 hover:bg-gray-200 rounded-full px-3 mr-3 transition duration-700 ease-in-out">
//       <p className="sr-only">change language</p>
//       <select
//         value={currentLocale}
//         className="bg-transparent appearance-none text-sm font-medium text-center cursor-pointer focus:outline-none"
//         onChange={onSelectChange}
//         disabled={isPending}
//       >
//         <option value="en">ENG</option>
//         <option value="ru">RUS</option>
//         <option value="ro">ROM</option>
//       </select>
//     </label>
//   );
// }
