import Link from "next/link";
import React from "react";

function Topics() {
  return (
    <section
      aria-labelledby="timeline-title"
      className="lg:col-span-1 lg:col-start-3"
    >
      <div className="bg-white px-4 py-5 divide-y shadow sm:rounded-lg sm:px-6">
        <h2
          id="timeline-title"
          className="text-lg font-medium text-purple-700 "
        >
          Topics
        </h2>

        {/* Activity Feed */}
        <div className="mt-6 flow-root">
          <ul role="list" className="-mb-8">
            {[{ id: 1 }].map((item) => (
              <li key={item.id}>
                <div className="relative pb-5">
                  <div className="relative flex space-x-3">
                    <div className="flex min-w-0 flex-1 justify-between space-x-2 pt-1">
                      <div>
                        <p className="text-sm text-gray-500">
                          #
                          <Link href="#" className="font-medium text-gray-900">
                            Topic 1
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Topics;
