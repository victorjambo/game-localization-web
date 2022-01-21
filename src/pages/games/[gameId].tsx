import Header from "@/components/header";
import {
  ChevronLeftIcon,
  ExclamationCircleIcon,
  PencilAltIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import Languages from "@/components/languages";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteGame,
  fetchGame,
  updateGame,
} from "@/state/games/thunkActions";
import { updateGameField } from "@/state/games/slice";
import { AppState } from "@/state";
import Loader from "@/components/loader";
import Modal from "@/components/modal";
import DatePicker from "react-datepicker";

const toggleAll = {
  created_at: true,
  release_date: true,
  id: true,
  name: true,
  word_count: true,
  available_languages: true,
};

const NottoggleAll = {
  created_at: false,
  release_date: false,
  id: false,
  name: false,
  word_count: false,
  available_languages: false,
};

const SingleGame: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    query: { gameId },
  } = router;

  const [isDeleteModal, closeDeleteModal] = useState(false);
  const [isEditable, setEditable] = useState({
    created_at: false,
    release_date: false,
    id: false,
    name: false,
    word_count: false,
    available_languages: false,
  });

  const {
    gamesReducer: { game, loadingGame: loading, gameNotFound },
  } = useSelector((state: AppState) => state);

  useEffect(() => {
    dispatch(fetchGame(gameId as string));
  }, [dispatch, gameId]);

  const handleDelete = async () => {
    const response = await deleteGame(gameId as string);
    if (response === 204) {
      router.push("/games");
    }
  };

  const handleSave = async (field: string) => {
    setEditable((prev) => {
      return {
        ...prev,
        [field]: false,
      };
    });
    await updateGame(gameId as string, {
      [field]: (game as any)[field],
    });
  };

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
            {!gameNotFound && (
              <button
                type="button"
                className="order-0 inline-flex space-x-1 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                onClick={() => closeDeleteModal(true)}
              >
                <TrashIcon className="w-5 h-5" />
                <span>Delete Game</span>
              </button>
            )}
          </div>
          {!gameNotFound && (
            <span>
              {loading || !game?.name ? (
                <Loader />
              ) : (
                <div className="text-3xl">{!isEditable.name && game.name}</div>
              )}
            </span>
          )}
        </div>
        {gameNotFound ? (
          <div className="mt-5 border-t border-gray-200 flex flex-col justify-center items-center">
            <ExclamationCircleIcon className="w-52 h-52" />
            <span className="text-3xl">Game Not found</span>
          </div>
        ) : (
          <div className="mt-5 border-t border-gray-200">
            <dl className="sm:divide-y sm:divide-gray-200">
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Game name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEditable.name ? (
                    <div className="flex flex-row space-x-2 items-center">
                      <input
                        type="text"
                        value={game.name}
                        onChange={(e) =>
                          dispatch(
                            updateGameField({
                              field: "name",
                              value: e.target.value,
                            })
                          )
                        }
                        className={`rounded-md px-5 py-4 w-full border hover:border-gray-600`}
                      />
                      <button
                        className="font-semibold text-purple-600 hover:text-purple-700"
                        onClick={() => handleSave("name")}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span>
                      {loading || !game?.name ? (
                        <Loader />
                      ) : (
                        <span>{game.name}</span>
                      )}
                    </span>
                  )}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Release Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEditable.release_date ? (
                    <div className="flex flex-row space-x-2 items-center">
                      <DatePicker
                        className={`rounded-md px-5 py-4 w-full border border-gray-400 hover:border-gray-600`}
                        selected={new Date(game.release_date)}
                        startDate={new Date()}
                        minDate={new Date()}
                        onChange={(date) =>
                          dispatch(
                            updateGameField({
                              field: "release_date",
                              value: moment(date).format(),
                            })
                          )
                        }
                      />
                      <button
                        className="font-semibold text-purple-600 hover:text-purple-700"
                        onClick={() => handleSave("release_date")}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span>
                      {loading || !game?.release_date ? (
                        <Loader />
                      ) : (
                        <span>{moment(game.release_date).format("LLLL")}</span>
                      )}
                    </span>
                  )}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">Languages</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEditable.available_languages ? (
                    <div className="flex flex-row space-x-2 items-center">
                      <input
                        type="text"
                        defaultValue={game.available_languages.join(",")}
                        className={`rounded-md px-5 py-4 w-full border hover:border-gray-600`}
                      />
                      <button
                        className="font-semibold text-purple-600 hover:text-purple-700"
                        onClick={() => handleSave("available_languages")}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span>
                      {loading || !game?.available_languages ? (
                        <Loader />
                      ) : (
                        <Languages
                          available_languages={game.available_languages}
                          showAll
                        />
                      )}
                    </span>
                  )}
                </dd>
              </div>
              <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt className="text-sm font-medium text-gray-500">
                  Number of words
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {isEditable.word_count ? (
                    <div className="flex flex-row space-x-2 items-center">
                      <input
                        type="number"
                        defaultValue={game.word_count}
                        className={`rounded-md px-5 py-4 w-full border hover:border-gray-600`}
                      />
                      <button
                        className="font-semibold text-purple-600 hover:text-purple-700"
                        onClick={() => handleSave("word_count")}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <span>
                      {loading || !game?.word_count ? (
                        <Loader />
                      ) : (
                        <span>{game.word_count}</span>
                      )}
                    </span>
                  )}
                </dd>
              </div>

              <div className="py-4 flex justify-end">
                <button
                  type="button"
                  className="order-0 inline-flex space-x-1 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={() => setEditable(toggleAll)}
                >
                  <PencilAltIcon className="w-5 h-5" />
                  <span>Update Game</span>
                </button>
              </div>
            </dl>
          </div>
        )}
      </div>
      <Modal
        isOpen={isDeleteModal}
        handleCloseModal={() => null}
        title="Confirm delete"
      >
        <div className="flex flex-row justify-end mt-10 space-x-4">
          <button
            className="py-3 px-6 bg-gray-200 hover:bg-gray-300 text-center rounded-md"
            onClick={() => closeDeleteModal(false)}
            type="reset"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-3 px-6 bg-red-500 hover:bg-red-600 text-center rounded-md text-white"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default SingleGame;
