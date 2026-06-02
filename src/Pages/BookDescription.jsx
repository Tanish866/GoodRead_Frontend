import bookImage from "Assets/Images/images.jpg";
import Layout from "Layout/Layout";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function BookDescription() {
  const { state } = useLocation();

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <Layout>
      {state?._id && (
        <div className="flex h-full items-center justify-center overflow-y-auto bg-[#181b24] px-4 py-8 text-white sm:px-6 lg:px-10">
          <div className="flex w-full max-w-6xl flex-col items-center gap-10 md:flex-row md:gap-20">
            <div className="shrink-0">
              <img
                src={bookImage}
                alt="Book Cover"
                className="h-[360px] w-[230px] object-cover shadow-2xl sm:h-[440px] sm:w-[280px] lg:h-[520px] lg:w-[330px]"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
                {state.title}
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg md:mx-0 lg:mt-10 lg:text-2xl">
                {state.description}
              </p>

              <p className="mt-6 text-2xl font-semibold text-yellow-300 lg:mt-10 lg:text-3xl">
                {state.author?.name}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start lg:mt-10">
                {state.genres?.map((genre) => (
                  <span
                    key={genre._id}
                    className="rounded-lg bg-purple-700 px-4 py-2 text-base sm:text-lg lg:text-xl"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="mt-8 space-y-4 text-lg sm:text-xl lg:mt-12 lg:space-y-8 lg:text-2xl">
                <p className="text-white/70">
                  Pages:{" "}
                  <span className="text-yellow-300">
                    {state.pages}
                  </span>
                </p>

                <p className="text-white/70">
                  Publish Date:{" "}
                  <span className="text-yellow-300">
                    {state.publishDate}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}