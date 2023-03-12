"use client";

import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Notify } from "notiflix";
import { Fragment, useState } from "react";

import Button from "@/src/components/common/button/Button";
import { Database } from "@/supabase/database";
import { User } from "@/supabase/models";

import Input from "../common/input/Input";
import Textarea from "../common/textarea/Textarea";

interface EditProfileProps {
  profile: User;
}

export default function EditProfile({ profile }: EditProfileProps) {
  const supabase = useSupabaseClient<Database>();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [fullName, setFullName] = useState(profile.full_name);
  const [bio, setBio] = useState(profile.bio);
  const [website, setWebsite] = useState(profile.website);
  const [birthdate, setBirthdate] = useState(profile.birthdate);
  const [horoscope, setHoroscope] = useState(profile.horoscope);
  const [location, setLocation] = useState(profile.location);
  const [relationship, setRelationship] = useState(profile.relationship_status);

  const user = useUser();
  const isOwnerUser = user && user.user_metadata.username === profile.username;

  async function onSave() {
    setIsLoading(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        relationship_status: relationship,
        full_name: fullName,
        bio: bio,
        website: website,
        birthdate: birthdate,
        horoscope: horoscope,
        location: location
      })
      .eq("id", profile.id);

    if (error) {
      Notify.failure(error.message);
      return;
    }

    setIsLoading(false);
    setOpen(false);
  }

  return (
    <>
      {isOwnerUser && (
        <div>
          <div className="mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
            <Button
              startIcon={<PencilSquareIcon className="h-5 w-5" />}
              onClick={() => setOpen(!open)}
            >
              Edit Profile
            </Button>
          </div>

          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
              <div className="fixed inset-0" />

              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <Transition.Child
                      as={Fragment}
                      enter="transform transition ease-in-out duration-500 sm:duration-700"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transform transition ease-in-out duration-500 sm:duration-700"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white py-6  shadow-xl dark:bg-slate-700">
                          <div className="px-4 sm:px-6">
                            <div className="flex items-start justify-between">
                              <Dialog.Title className="text-base font-semibold leading-6 text-purple-700">
                                {profile.username}
                              </Dialog.Title>
                              <div className="ml-3 flex h-7 items-center">
                                <button
                                  type="button"
                                  className="rounded-md bg-white text-gray-400  hover:text-gray-500 focus:outline-none  focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-slate-700 hover:dark:text-gray-300"
                                  onClick={() => setOpen(false)}
                                >
                                  <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="relative mt-6 flex-1 space-y-5 px-4 sm:px-6">
                            {/* Your content */}
                            <Input
                              label="Full Name"
                              name="fullname"
                              type={"text"}
                              placeholder="Mrs. Kitten"
                              value={fullName}
                              maxLength={50}
                              onChange={e => setFullName(e.target.value)}
                            />

                            <Input
                              label="Website"
                              name="website"
                              type={"url"}
                              placeholder="https://askanonym.com"
                              value={website}
                              maxLength={50}
                              onChange={e => setWebsite(e.target.value)}
                            />

                            <Input
                              label="Location"
                              name="location"
                              type={"text"}
                              placeholder="Istanbul"
                              value={location}
                              maxLength={50}
                              onChange={e => setLocation(e.target.value)}
                            />

                            <Input
                              label="Horoscope"
                              name="horoscope"
                              type={"text"}
                              placeholder="Scorpio"
                              value={horoscope}
                              maxLength={50}
                              onChange={e => setHoroscope(e.target.value)}
                            />

                            <Input
                              label="Relationship Status"
                              name="relationship"
                              type={"text"}
                              placeholder="Single"
                              value={relationship}
                              maxLength={50}
                              onChange={e => setRelationship(e.target.value)}
                            />

                            <Input
                              label="Birthdate"
                              name="birthdate"
                              type={"date"}
                              placeholder="28.10.1993"
                              value={birthdate}
                              maxLength={50}
                              onChange={e => setBirthdate(e.target.value)}
                            />

                            <Textarea
                              maxLength={100}
                              placeholder="About yourself"
                              value={bio}
                              setValue={e => setBio(e)}
                            />

                            <Button
                              startIcon={<CheckIcon className="h-5 w-5" />}
                              className="w-full"
                              isLoading={isLoading}
                              onClick={() => onSave()}
                            >
                              Save
                            </Button>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      )}
    </>
  );
}
