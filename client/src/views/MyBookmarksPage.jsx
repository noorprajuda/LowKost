import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBookmarksUser } from "../store/action";
import CardBookmark from "../components/CardBookmark";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";

export default function MyBookmarksPage() {
  const dispatch = useDispatch();
  const { loading } = useFetch("http://localhost:4000/user/bookmark");
  const bookmarks = useSelector((state) => state.bookmarks.bookmarks);

  useEffect(() => {
    dispatch(fetchBookmarksUser());
  }, []);

  return (
    <>
      {loading === false ? (
        <div className="mt-20 mb-28">
          <div className="grid grid-cols-4 gap-4 mr-20 ml-20">
            {bookmarks.map((bookmark, index) => {
              return (
                <>
                  <CardBookmark key={bookmark.id} bookmark={bookmark} />
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
