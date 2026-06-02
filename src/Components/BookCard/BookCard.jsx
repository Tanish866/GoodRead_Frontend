import BookImage from "Assets/Images/images.jpg";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function BookCard({ data }) {
  const navigate = useNavigate();

  function openBookDetails() {
    navigate("/book/description", { state: { ...data } });
  }

  return (
    <div className="card my-5 bg-base-100 shadow-sm md:card-side">
      <figure className="md:w-64">
        <img
          src={BookImage}
          alt={data.title}
          className="h-64 w-full object-cover md:h-full"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title text-2xl text-white sm:text-3xl">
          {data.title}
        </h2>

        <div className="mt-4 flex flex-col gap-5 md:mt-18 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 text-base text-white sm:text-xl">
            <div className="flex items-center gap-3 sm:gap-5">
              <AiOutlineUser />
              <span>{data.author?.name}</span>
            </div>

            <p className="line-clamp-3 text-white/80">
              {data?.description}
            </p>
          </div>

          <div className="card-actions md:justify-end">
            <button
              onClick={openBookDetails}
              className="btn btn-primary w-full md:w-auto"
            >
              More Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}