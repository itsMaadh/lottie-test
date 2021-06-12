import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import Image from "next/image";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const router = useRouter();
  // navigation items
  const navigation = [
    {
      name: "Featured",
      href: "/featured",
    },
    { name: "Recent", href: "/recent" },
  ];

  // function called on search
  const onSearch = async (e): Promise<void> => {
    e.preventDefault();
    await router.push({
      pathname: "/search",
      query: { q: e.target[0].value },
    });
    e.target.reset();
  };

  return (
    <div>
      <Disclosure as="nav" className="bg-gray-100">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {/*Lottiefiles logos*/}
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <Link href={"/"}>
                    <a>
                      <div className="flex-shrink-0 flex items-center">
                        <div className="block lg:hidden h-8 w-auto">
                          <Image
                            src={"/lf_Symbol.svg"}
                            alt="LottieFiles logo"
                            width={30}
                            height={30}
                          />
                        </div>
                        <div className="hidden lg:block h-8 w-auto">
                          <Image
                            src={"/lf_Logo.png"}
                            alt="LottieFiles logo"
                            width={120}
                            height={35}
                          />
                        </div>
                      </div>
                    </a>
                  </Link>

                  {/*Menu items for desktop*/}
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link href={item.href} key={item.name}>
                          <a
                            key={item.name}
                            className={classNames(
                              router.asPath.includes(item.href)
                                ? "bg-lf-teal-dark text-white"
                                : "text-lf-teal hover:bg-lf-teal hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium tracking-wide"
                            )}
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                {/*Search field*/}
                <div className="hidden md:block">
                  <form onSubmit={onSearch}>
                    <input
                      type="text"
                      placeholder="Search"
                      className="outline-none text-sm focus:bg-lf-teal focus:text-white focus:font-bold bg-purple-white rounded-lg shadow-sm w-full w-full border-0 p-2.5"
                    />
                  </form>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {/*Menu items for mobile*/}
                {navigation.map((item) => (
                  <Link href={item.href} key={item.name}>
                    <a
                      key={item.name}
                      className={classNames(
                        router.asPath.includes(item.href)
                          ? "bg-lf-teal-dark text-white"
                          : "text-lf-teal hover:bg-lf-teal hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium tracking-wide"
                      )}
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
                {/*Search field*/}
                <div className="outline-none bg-purple-white rounded-full w-full border-0 md:p-3 pb-2 relative">
                  <form onSubmit={onSearch}>
                    <input
                      type="text"
                      placeholder="Search"
                      className="outline-none text-sm focus:bg-lf-teal focus:text-white focus:font-bold bg-purple-white rounded-lg shadow-sm w-full w-full border-0 p-2.5"
                    />
                  </form>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
