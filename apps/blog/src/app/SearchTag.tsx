"use client";

import { Badge } from "@/components/Badge";
import { useRouter } from "next/navigation";
import React, { FC, PropsWithChildren } from "react";

interface ISearchTagProps { }

const SearchTag: FC<PropsWithChildren<ISearchTagProps>> = (props) => {
  const r = useRouter();

  return (
    <Badge
      variant="secondary"
      className="cursor-pointer active:scale-[.96]"
      onClick={() => r.push("/")}
    >
      #{props.children}
    </Badge>
  );
};

SearchTag.displayName = "SearchTag";

export default SearchTag;
