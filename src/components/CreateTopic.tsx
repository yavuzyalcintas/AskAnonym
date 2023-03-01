"use client";

import { Database } from "@/supabase/database";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, PencilIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React, { Fragment, useState } from "react";
import { slugify } from "../helpers/formatting";
import Button from "./common/button/Button";
import Input from "./common/input/Input";

interface CreateTopicProps {
  username: string;
}

function CreateTopic({ username }: CreateTopicProps) {
  const supabase = useSupabaseClient<Database>();
  const [open, setOpen] = useState(false);
  const [topic, setTopic] = useState<string | undefined>(undefined);
  const user = useUser();
  const isOwnerUser = user && user.user_metadata.username === username;

  async function newTopic(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { data: newTopic, error } = await supabase
      .from("topics")
      .insert({
        name: topic!,
        slug: slugify(topic!),
      })
      .select("*")
      .single();

    if (!error) {
      await supabase.from("user_topics").insert({
        topic_id: newTopic.id,
        user_id: user?.id!,
      });
    }

    setOpen(false);
  }

  return (
    <>
      {isOwnerUser && (
        <div>
          <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
            <Button
              variant="contained"
              startIcon={<PencilIcon className="w-5 h-5" />}
              onClick={() => setOpen(true)}
            >
              New Topic
            </Button>
          </div>

          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                      <form
                        action="#"
                        method="POST"
                        onSubmit={(e) => newTopic(e)}
                      >
                        <div>
                          <Input
                            label="Topic"
                            name="topic"
                            required
                            type={"text"}
                            placeholder="cool.topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                          />
                        </div>
                        <div className="mt-5 sm:mt-6">
                          <Button
                            className="inline-flex w-full"
                            variant="contained"
                            size="small"
                            type="submit"
                            startIcon={<PencilIcon className="w-5 h-5" />}
                          >
                            Create Topic
                          </Button>
                        </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      )}
    </>
  );
}

export default CreateTopic;
