/* eslint-disable @next/next/no-img-element */
import Languages from "../../components/languages";
import { PlusIcon } from "@heroicons/react/solid";
import { useState } from "react";
import CreateGame from "../../components/create";
import { useSelector } from "react-redux";
import { AppState } from "@/state";

const Games = () => {
  const [openModal, setOpenModal] = useState(false);

  const {
    gamesReducer: { games },
  } = useSelector((state: AppState) => state);

  return (
    <>
      <div className="px-10p">
        <div className="flex flex-col">
          <div className="flex-1">
            {/* Page title & actions */}
            <div className="border-b border-gray-200 px-4 py-4 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                  Games
                </h1>
              </div>
              <div className="flex mt-0">
                <button
                  type="button"
                  className="order-0 inline-flex space-x-1 items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  onClick={() => setOpenModal(true)}
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Create</span>
                </button>
              </div>
            </div>

            <div className="">
              <div className="align-middle inline-block min-w-full border-b border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-t border-gray-200">
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <span>Name</span>
                      </th>
                      <th className="table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Release
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Languages
                      </th>
                      <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {games.map((game) => (
                      <tr key={game.id} className="hover:bg-gray-50">
                        <td className="px-6 py-3 max-w-0 w-full whitespace-nowrap text-sm font-medium text-gray-900">
                          <div className="flex items-center space-x-3">
                            <div className="truncate hover:text-gray-600">
                              <span>{game.name}</span>
                            </div>
                          </div>
                        </td>
                        <td className="table-cell px-6 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                          {game.release_date}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-500 font-medium">
                          <Languages
                            available_languages={game.available_languages}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateGame {...{ openModal, setOpenModal }} />
    </>
  );
};

export default Games;
