import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Sort from "../../shared/Sort";
import AllFilters from "../../shared/Filters/AllFilters";

const UserCoursesActions = React.memo(() => {
  const [areActionsOpen, setAreActionsOpen] = useState(true);

  return (
    <div className="md:my-6">
      <div className="items-center justify-between hidden md:flex">
        <h4 className="text-xs font-bold tracking-wide lg:text-base">
          List Actions
        </h4>
        <FontAwesomeIcon
          icon={faAngleDown}
          onClick={() => setAreActionsOpen((prevState) => !prevState)}
          className={`duration-300 mr-2 text-zinc-800 cursor-pointer ${
            areActionsOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <div
        className={`grid items-center grid-cols-2 md:grid-cols-1 relative duration-300 w-full gap-4 xl:w-5/6 mt-6 ${
          areActionsOpen
            ? "opacity-100 translate-y-0"
            : "md:opacity-0 md:-translate-y-5"
        }`}
      >
        <Sort />
        <AllFilters />
      </div>
    </div>
  );
});

UserCoursesActions.displayName = "UserCoursesActions";

export default UserCoursesActions;
