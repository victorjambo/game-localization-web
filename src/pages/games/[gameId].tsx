import Header from "../../components/header";
import {
  ChevronLeftIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import Languages from "../../components/languages";
import moment from "moment";

const game = {
  release_date: "2022-01-11T12:36:38",
  created_at: "2022-01-20T18:39:38.689600",
  id: "7e934bba-0afd-4a41-9353-5806884b066c",
  name: "God of war",
  word_count: 123,
  available_languages: ["en", "de", "ru", "it", "ko", "pt"],
};

const SingleGame: React.FC = () => {
  const router = useRouter();
  const {
    query: { gameId },
  } = router;

  return (
    <>
      <Header title="Need for speed" />
      <div className="px-10p pt-10">
        <div className="flex flex-col space-y-7">
          <div className="flex flex-row justify-between">
            <Link href="/games" passHref>
              <div className="flex flex-row items-center cursor-pointer hover:opacity-80">
                <ChevronLeftIcon className="w-5 h-5" />
                <span>Back to games</span>
              </div>
            </Link>
            <button
              type="button"
              className="order-0 inline-flex space-x-1 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              <TrashIcon className="w-5 h-5" />
              <span>Delete Game</span>
            </button>
          </div>
          <div className="text-3xl">{game.name}</div>
        </div>
        <div className="mt-5 border-t border-gray-200">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Game name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {game.name}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Release Date
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {moment(game.release_date).format("LLLL")}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">Languages</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <Languages
                  available_languages={game.available_languages}
                  showAll
                />
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-gray-500">
                Number of words
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {game.word_count}
              </dd>
            </div>

            <div className="py-4 flex justify-end">
              <button
                type="button"
                className="order-0 inline-flex space-x-1 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <PencilAltIcon className="w-5 h-5" />
                <span>Update Game</span>
              </button>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

export default SingleGame;
