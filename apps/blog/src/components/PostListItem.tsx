import { Post } from "contentlayer/generated";
import { differenceInHours, isThisYear, isToday } from "date-fns";
import format from "date-fns/format";
import Link from "next/link";
import React, { FC, PropsWithChildren } from "react";

interface IPostListItemProps {
  post: Post;
}

const PostListItem: FC<PropsWithChildren<IPostListItemProps>> = ({ post }) => {
  const date = new Date(post.date);

  const is_today = isToday(date);
  const is_this_year = isThisYear(date);
  const hrs_ago = differenceInHours(Date.now(), date);

  return (
    <Link
      href={post.slug}
      className="transition-all duration-150 active:scale-[.98]"
    >
      <li className="flex gap-4 justify-start items-center py-2 px-4 rounded hover:bg-neutral-2">
        <div className="flex-1">
          <h3 className="mb-1 text-xl font-medium sm:text-2xl">{post.title}</h3>
          <p className="text-sm sm:text-base">{post.summary}</p>
        </div>
        {is_today ? (
          <small className="text-sm text-center opacity-50 min-w-[50px]">
            {hrs_ago > 3
              ? "Today"
              : `${hrs_ago}hr${hrs_ago > 1 ? "s" : ""} ago`}
          </small>
        ) : (
          <>
            <small className="text-sm text-center opacity-50 md:hidden min-w-[50px]">
              {!is_this_year && (
                <>
                  {format(date, "yyyy")} <br />
                </>
              )}
              {format(date, "MMM do")}
            </small>
            <small className="hidden ml-auto opacity-50 md:block">
              {format(date, is_this_year ? "MMMM do" : "MMMM do, yyyy")}
            </small>
          </>
        )}
      </li>
    </Link>
  );
};

PostListItem.displayName = "PostListItem";

export default PostListItem;
