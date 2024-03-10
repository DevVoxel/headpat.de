"use client";

import { editUserData } from "utils/actions/user-actions";
import { ErrorMessage, SuccessMessage } from "../../alerts";
import Link from "next/link";
import { useState } from "react";

export default function FrontPage({ userDataSelf, userId }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const getAvatarImageUrl = (galleryId: string) => {
    return `${process.env.NEXT_PUBLIC_API_URL}/v1/storage/buckets/655842922bac16a94a25/files/${galleryId}/preview?project=6557c1a8b6c2739b3ecf&width=400`;
  };

  const [userData, setUserData] = useState({
    status: userDataSelf.status || "",
    bio: userDataSelf.bio || "",
    displayname: userDataSelf.displayName || "",
    pronouns: userDataSelf.pronouns || "",
    birthday: userDataSelf.birthday || "",
    location: userDataSelf.location || "",
    avatar:
      getAvatarImageUrl(userDataSelf.avatarId) ||
      "/logos/Headpat_new_logo.webp",
  });

  const handleAvatarChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.size > 2 * 1024 * 1024) {
      displayError("File size must be less than 2MB.");
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        img.width <= 1024 && img.height <= 1024
          ? setSelectedFile(selectedFile)
          : displayError("Image resolution must be less than 1024x1024.");
      };
      img.src = event.target.result;
      document.getElementById("avatar-image").src = event.target.result;
    };
    fileReader.readAsDataURL(selectedFile);
  };

  const displayError = (message) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  const handleSubmitAvatar = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("fileId", "unique()");

    try {
      // Year-Month-Day (YYYY-MM-DD)

      setIsUploading(true); // Set isUploading to true before making the API call

      const response = await fetch(`/api/user/avatarChange/${userId}`, {
        method: "POST",
        body: formData,
      });

      //const responseData = await response.json();
      if (response.ok) {
        //console.log("File uploaded successfully");
        setIsUploading(false); // Set isUploading to false after the API call is complete
        // Reload the window
        //setSuccess("Gespeichert und hochgeladen!");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //const formData = new FormData();
    //formData.append("file", selectedFile);

    try {
      // Year-Month-Day (YYYY-MM-DD)

      setIsUploading(true); // Set isUploading to true before making the API call

      const body = {
        data: {
          status: userData.status,
          bio: userData.bio,
          displayname: userData.displayname,
          birthday: userData.birthday,
          pronouns: userData.pronouns,
          location: userData.location,
        },
      };

      console.log(body);
      const responseData = await editUserData(userId, body);
      if (responseData) {
        //console.log("File uploaded successfully");
        setIsUploading(false); // Set isUploading to false after the API call is complete
        setUserData(responseData); // Set the userData state with the response data
        //setSuccess("Gespeichert!");
        // Reload the window
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      setError("Ein Fehler ist aufgetreten." + error);
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  const secondaryNavigation = [
    { name: "Account", href: "/account", current: false },
    { name: "Frontpage", href: "/account/frontpage", current: true },
    { name: "Socials", href: "/account/socials", current: false },
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
            <h2 className="text-base font-semibold leading-7">
              Frontpage Einstellungen
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-900 dark:text-gray-400">
              Hier kannst du deine Biografie, Profilbild etc. verwalten.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full flex items-center gap-x-8">
                <img
                  id="avatar-image"
                  src={userData.avatar || "/logos/logo.webp"}
                  alt=""
                  className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                />
                <div>
                  <input
                    accept="image/*"
                    className="rounded-md px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-black/10 hover:bg-white/20 dark:ring-white/10"
                    id="avatar-upload"
                    name="avatar-upload"
                    type="file"
                    onChange={handleAvatarChange}
                  />
                  <div className="flex items-center justify-between">
                    <p className="mt-2 text-xs leading-5 text-gray-900 dark:text-gray-400">
                      JPG, GIF or PNG. 2MB max.
                    </p>
                    <button
                      type="submit"
                      onClick={handleSubmitAvatar}
                      className="mt-2 rounded bg-indigo-500 px-4 py-2 font-bold text-white hover:bg-indigo-700"
                    >
                      Submit
                    </button>
                  </div>
                  <p className="mt-2 text-xs leading-5 text-gray-900 dark:text-gray-400">
                    1024x1024 max. resolution
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-full sm:grid-cols-6">
              <div className="col-span-full">
                <label
                  htmlFor="displayname"
                  className="block text-sm font-medium leading-6"
                >
                  Display Name
                </label>
                <div className="relative mt-2">
                  <input
                    id="displayname"
                    name="displayname"
                    type="text"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-white/10 sm:text-sm sm:leading-6"
                    value={userData.displayname || ""} // Set the value from state, or an empty string if it's undefined
                    onChange={(e) => {
                      if (e.target.value.length <= 32) {
                        setUserData({
                          ...userData,
                          displayname: e.target.value,
                        });
                      }
                    }} // Update state when the input changes, only if the length is less than or equal to 32
                    maxLength={32} // Limit the maximum number of characters to 32
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
                    <span className="select-none">
                      {userData.displayname ? userData.displayname.length : 0}{" "}
                      {/* Check if userData.displayname is defined before accessing its length property */}
                    </span>
                    <span className="select-none text-gray-400">/{32}</span>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium leading-6"
                >
                  Status
                </label>
                <div className="relative mt-2">
                  <input
                    id="status"
                    name="status"
                    type="text"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-white/10 sm:text-sm sm:leading-6"
                    value={userData.status} // Set the value from state
                    onChange={(e) => {
                      if (e.target.value.length <= 24) {
                        setUserData({ ...userData, status: e.target.value });
                      }
                    }} // Update state when the input changes, only if the length is less than or equal to 24
                    maxLength={24} // Limit the maximum number of characters to 24
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
                    <span className="select-none">
                      {userData.status ? userData.status.length : 0}{" "}
                    </span>
                    <span className="select-none text-gray-400">/{24}</span>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="pronouns"
                  className="block text-sm font-medium leading-6"
                >
                  Pronouns
                </label>
                <div className="relative mt-2">
                  <input
                    id="pronouns"
                    name="pronouns"
                    type="text"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-white/10 sm:text-sm sm:leading-6"
                    value={userData.pronouns} // Set the value from state
                    onChange={(e) => {
                      if (e.target.value.length <= 16) {
                        setUserData({
                          ...userData,
                          pronouns: e.target.value,
                        });
                      }
                    }} // Update state when the input changes, only if the length is less than or equal to 16
                    maxLength={16} // Limit the maximum number of characters to 16
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
                    <span className="select-none">
                      {userData.pronouns ? userData.pronouns.length : 0}{" "}
                    </span>
                    <span className="select-none text-gray-400">/{16}</span>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="birthday"
                  className="block text-sm font-medium leading-6"
                >
                  Birthday
                </label>
                <div className="relative mt-2">
                  <input
                    id="birthday"
                    name="birthday"
                    type="date"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-white/10 sm:text-sm sm:leading-6"
                    value={
                      userData.birthday
                        ? new Date(userData.birthday)
                            .toISOString()
                            .split("T")[0]
                        : ""
                    } // Set the value from state in the correct format
                    onChange={(e) => {
                      setUserData({ ...userData, birthday: e.target.value });
                    }} // Update state when the input changes
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
                    <span
                      aria-disabled
                      className="mr-6 select-none text-gray-400"
                    >
                      DD/MM/YYYY
                    </span>{" "}
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium leading-6"
                >
                  Location
                </label>
                <div className="relative mt-2">
                  <input
                    id="location"
                    name="location"
                    type="text"
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-white/10 sm:text-sm sm:leading-6"
                    value={userData.location} // Set the value from state
                    onChange={(e) => {
                      if (e.target.value.length <= 256) {
                        setUserData({
                          ...userData,
                          location: e.target.value,
                        });
                      }
                    }} // Update state when the input changes, only if the length is less than or equal to 16
                    maxLength={256} // Limit the maximum number of characters to 16
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5">
                    <span className="select-none">
                      {userData.location ? userData.location.length : 0}{" "}
                    </span>
                    <span className="select-none text-gray-400">/{256}</span>
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="biostatus"
                  className="block text-sm font-medium leading-6"
                >
                  Bio
                </label>
                <div className="relative mt-2">
                  <textarea
                    id="biostatus"
                    name="biostatus"
                    className="block h-72 w-full rounded-md border-0 bg-white/5 py-1.5 shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:ring-white/10 sm:text-sm sm:leading-6"
                    value={userData.bio} // Set the value from state
                    onChange={(e) => {
                      if (e.target.value.length <= 2048) {
                        setUserData({ ...userData, bio: e.target.value });
                      }
                    }} // Update state when the input changes, only if the length is less than or equal to 256
                    maxLength={2048} // Limit the maximum number of characters to 256
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-end pb-2 pr-4 text-sm leading-5">
                    <span className="select-none">
                      {userData.bio ? userData.bio.length : 0}{" "}
                    </span>
                    <span className="select-none text-gray-400">/{2048}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <button
                type="submit"
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
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
