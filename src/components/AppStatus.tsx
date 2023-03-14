import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function AppStatus() {
  return (
    <div className="rounded-md bg-cyan-50 p-4">
      <div className="flex">
        <div className="shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-cyan-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-cyan-800">
            Feature Requests & Bug Reports
          </h3>
          <div className="mt-2 text-sm text-cyan-700">
            <p>
              You can vote feature requests and bug reports with{" "}
              <Link
                className="text-base font-extrabold text-purple-700"
                href="https://askanonym.canny.io/"
                target="_blank"
              >
                canny.io
              </Link>{" "}
              now!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
