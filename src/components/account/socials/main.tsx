"use client";
import { useState } from "react";
import Link from "next/link";
import { ErrorMessage, SuccessMessage } from "../../alerts";

export default function Socials({ userDataSelf, userId }) {
  const [isUploading, setIsUploading] = useState(false);
  const [userData, setUserData] = useState({
    discordname: userDataSelf.discordname || "",
    telegramname: userDataSelf.telegramname || "",
    furaffinityname: userDataSelf.furaffinityname || "",
    X_name: userDataSelf.X_name || "",
    twitchname: userDataSelf.twitchname || "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsUploading(true);

      const response = await fetch(`/api/user/editUserData/${userId}`, {
        method: "PATCH",
        body: JSON.stringify({
          data: {
            discordname: userData.discordname,
            telegramname: userData.telegramname,
            furaffinityname: userData.furaffinityname,
            X_name: userData.X_name,
            twitchname: userData.twitchname,
          },
        }),
      });

      const responseData = await response.json();
      if (response.ok) {
        setIsUploading(false);
        setSuccess("Gespeichert!");
      } else {
        setIsUploading(false);
        setError("Failed to upload Data");
        console.error("Failed to upload Data:", responseData);
      }
    } catch (error) {
      setIsUploading(false);
      setError("Failed to upload Data");
      console.error(error);
    }
  };

  const secondaryNavigation = [
    { name: "Account", href: "/account", current: false },
    { name: "Frontpage", href: "/account/frontpage", current: false },
    { name: "Socials", href: "/account/socials", current: true },
  ];

  return (
    <>
      {success && <SuccessMessage attentionSuccess={success} />}
      {error && <ErrorMessage attentionError={error} />}
      <header className="border-b border-black/5 dark:border-white/5">
        {/* Secondary navigation */}
        <nav className="flex overflow-x-auto py-4">
          <ul
            role="list"
            className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-900 dark:text-gray-400 sm:px-6 lg:px-8"
          >
            {secondaryNavigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={item.current ? "text-indigo-400" : ""}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <div className="divide-y divide-black/5 dark:divide-white/5">
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7">Socials</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Hier kannst du deine Links zu deinen Social Media Accounts
              eintragen.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="discordname"
                  className="block text-sm font-medium leading-6"
                >
                  Discord ID (196742608846979072 z.B.)
                </label>
                <div className="relative mt-2">
                  <input
                    type="text"
                    name="discordname"
                    id="discordname"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-white/10 sm:text-sm sm:leading-6"
                    value={userData.discordname} // Set the value from state
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      setUserData((prevData) => ({
                        ...prevData,
                        discordname: target.value.slice(0, 32),
                      }));
                    }}
                    maxLength={32} // Limit the maximum number of characters to 32
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
                    <span className="select-none">
                      {userData.discordname ? userData.discordname.length : 0}{" "}
                      {/* Check if userData.discordname is defined before accessing its length property */}
                    </span>
                    <span className="select-none text-gray-400">/{32}</span>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="telegramname"
                  className="block text-sm font-medium leading-6"
                >
                  Telegram Name
                </label>
                <div className="relative mt-2">
                  <input
                    type="text"
                    name="telegramname"
                    id="telegramname"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-white/10 sm:text-sm sm:leading-6"
                    value={userData.telegramname} // Set the value from state
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      setUserData((prevData) => ({
                        ...prevData,
                        telegramname: target.value.slice(0, 32),
                      }));
                    }}
                    maxLength={32} // Limit the maximum number of characters to 32
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
                    <span className="select-none">
                      {userData.telegramname ? userData.telegramname.length : 0}
                      {/* Check if userData.telegramname is defined before accessing its length property */}
                    </span>
                    <span className="select-none text-gray-400">/{32}</span>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="furaffinityname"
                  className="block text-sm font-medium leading-6"
                >
                  Furaffinity Name
                </label>
                <div className="relative mt-2">
                  <input
                    type="text"
                    name="furaffinityname"
                    id="furaffinityname"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-white/10 sm:text-sm sm:leading-6"
                    value={userData.furaffinityname} // Set the value from state
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      setUserData((prevData) => ({
                        ...prevData,
                        furaffinityname: target.value.slice(0, 32),
                      }));
                    }}
                    maxLength={32} // Limit the maximum number of characters to 32
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
                    <span className="select-none">
                      {userData.furaffinityname
                        ? userData.furaffinityname.length
                        : 0}
                      {/* Check if userData.furaffinityname is defined before accessing its length property */}
                    </span>
                    <span className="select-none text-gray-400">/{32}</span>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="X_name"
                  className="block text-sm font-medium leading-6"
                >
                  X / Twitter Name
                </label>
                <div className="relative mt-2">
                  <input
                    type="text"
                    name="X_name"
                    id="X_name"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-white/10 sm:text-sm sm:leading-6"
                    value={userData.X_name} // Set the value from state
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      setUserData((prevData) => ({
                        ...prevData,
                        X_name: target.value.slice(0, 32),
                      }));
                    }}
                    maxLength={32} // Limit the maximum number of characters to 32
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
                    <span className="select-none">
                      {userData.X_name ? userData.X_name.length : 0}
                      {/* Check if userData.X_name is defined before accessing its length property */}
                    </span>
                    <span className="select-none text-gray-400">/{32}</span>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-6">
                <label
                  htmlFor="twitchname"
                  className="block text-sm font-medium leading-6"
                >
                  Twitch
                </label>
                <div className="relative mt-2">
                  <input
                    type="text"
                    name="twitchname"
                    id="twitchname"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-white/10 sm:text-sm sm:leading-6"
                    value={userData.twitchname} // Set the value from state
                    onChange={(e) => {
                      const target = e.target as HTMLInputElement;
                      setUserData((prevData) => ({
                        ...prevData,
                        twitchname: target.value.slice(0, 32),
                      }));
                    }}
                    maxLength={32} // Limit the maximum number of characters to 32
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
                    <span className="select-none">
                      {userData.twitchname ? userData.twitchname.length : 0}
                      {/* Check if userData.twitchname is defined before accessing its length property */}
                    </span>
                    <span className="select-none text-gray-400">/{32}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
