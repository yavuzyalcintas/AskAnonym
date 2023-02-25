"use client";

import { PencilIcon } from "@heroicons/react/24/outline";
import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import Button from "./common/button/Button";

interface CreateTopicProps {
  username: string;
}

function CreateTopic({ username }: CreateTopicProps) {
  const user = useUser();
  const isOwnerUser = user && user.user_metadata.username === username;

  return (
    <>
      {isOwnerUser && (
        <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
          <Button
            variant="contained"
            startIcon={<PencilIcon className="w-5 h-5" />}
          >
            New Topic
          </Button>
        </div>
      )}
    </>
  );
}

export default CreateTopic;
