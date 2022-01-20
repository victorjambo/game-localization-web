import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import Modal from "../modal";

interface IProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const CreateGame: React.FC<IProps> = ({ openModal, setOpenModal }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleCancel = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Modal isOpen={openModal} handleCloseModal={setOpenModal}>
        <div className="text-lg mb-5">New Game</div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-4">
            <div className="w-full">
              <label
                htmlFor="gameName"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="gameName"
                  className={`rounded-md px-5 py-4 w-full border ${errors.gameName ? "border-red-500" : "border-gray-400"} hover:border-gray-600`}
                  {...register("gameName", { required: true })}
                />
              </div>
              <p className="text-red-500 text-xs">{errors.gameName?.type === "required" && "Name is required"}</p>
            </div>

            <div className="w-full">
              <label
                htmlFor="releaseDate"
                className="block text-sm font-medium text-gray-700"
              >
                Release Date
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="releaseDate"
                  className={`rounded-md px-5 py-4 w-full border ${errors.gameName ? "border-red-500" : "border-gray-400"} hover:border-gray-600`}
                  {...register("releaseDate", { required: true })}
                />
              </div>
              <p className="text-red-500 text-xs">{errors.releaseDate?.type === "required" && "Release Date is required"}</p>
            </div>

            <div className="w-full">
              <label
                htmlFor="languages"
                className="block text-sm font-medium text-gray-700"
              >
                Languages
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="languages"
                  className={`rounded-md px-5 py-4 w-full border ${errors.gameName ? "border-red-500" : "border-gray-400"} hover:border-gray-600`}
                  {...register("languages", { required: true })}
                />
              </div>
              <p className="text-red-500 text-xs">{errors.languages?.type === "required" && "languages is required"}</p>
            </div>

            <div className="w-full">
              <label
                htmlFor="words"
                className="block text-sm font-medium text-gray-700"
              >
                Number of words
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="words"
                  className={`rounded-md px-5 py-4 w-full border ${errors.gameName ? "border-red-500" : "border-gray-400"} hover:border-gray-600`}
                  {...register("words", { min: 0, required: true })}
                />
                <p className="text-red-500 text-xs">
                  {errors.words?.type === "required" && "No. of words is required"}
                  {errors.words?.type === "min" && "No. of words should be > 0"}
                </p>
              </div>
            </div>

            <div className="flex flex-row space-x-3 self-end">
              <button
                className="py-3 px-6 bg-gray-200 hover:bg-gray-300 text-center rounded-md"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-3 px-6 bg-purple-600 hover:bg-purple-700 text-center rounded-md text-white"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateGame;