import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import Modal from "@/components/modal";
import moment from "moment";
import { createGame } from "@/state/games/thunkActions";
import { appendGame } from "@/state/games/slice";
import { useDispatch } from "react-redux";
import LanguageTags from "../languages/LanguageTags";

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
  const [startDate, setStartDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [languages, setLanguages] = useState<string[]>([]);
  const [langError, setLangError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (languages.length) {
      setLangError(false);
    }
  }, [languages.length]);

  const onSubmit = async (data: any) => {
    if (!languages.length) {
      setLangError(true);
      return;
    }
    setLoading(true);
    const response = await createGame({
      name: data.gameName,
      available_languages: languages,
      word_count: data.words,
      release_date: moment(startDate).format(),
    });
    if (response) {
      dispatch(appendGame(response));
      setOpenModal(false);
    } else {
      setError(false);
    }
    setLoading(false);
  };

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
                  placeholder="Name"
                  className={`rounded-md px-5 py-4 w-full border ${
                    errors.gameName ? "border-red-500" : "border-gray-400"
                  } hover:border-gray-600`}
                  {...register("gameName", { required: true })}
                />
              </div>
              <p className="text-red-500 text-xs">
                {errors.gameName?.type === "required" && "Name is required"}
              </p>
            </div>

            <div className="w-full">
              <label
                htmlFor="releaseDate"
                className="block text-sm font-medium text-gray-700"
              >
                Release Date
              </label>
              <div className="mt-1">
                <DatePicker
                  className={`rounded-md px-5 py-4 w-full border border-gray-400 hover:border-gray-600`}
                  selected={startDate}
                  startDate={startDate}
                  minDate={startDate}
                  onChange={(date) => setStartDate(date as any)}
                />
              </div>
              <p className="text-red-500 text-xs">
                {errors.releaseDate?.type === "required" &&
                  "Release Date is required"}
              </p>
            </div>

            <div className="w-full">
              <label
                htmlFor="languages"
                className="block text-sm font-medium text-gray-700"
              >
                Languages
              </label>
              <LanguageTags tags={languages} setTags={setLanguages} />
              <p className="text-red-500 text-xs">
                {langError && "languages is required"}
              </p>
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
                  placeholder="words"
                  className={`rounded-md px-5 py-4 w-full border ${
                    errors.words ? "border-red-500" : "border-gray-400"
                  } hover:border-gray-600`}
                  {...register("words", { min: 0, required: true })}
                />
                <p className="text-red-500 text-xs">
                  {errors.words?.type === "required" &&
                    "No. of words is required"}
                  {errors.words?.type === "min" && "No. of words should be > 0"}
                </p>
              </div>
            </div>

            <div className="flex flex-row space-x-3 self-end">
              <button
                className="py-3 px-6 bg-gray-200 hover:bg-gray-300 text-center rounded-md"
                onClick={handleCancel}
                type="reset"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex flex-row items-center space-x-2 py-3 px-6 bg-purple-600 hover:bg-purple-700 text-center rounded-md text-white"
                disabled={loading}
              >
                {loading && (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                <span>Create</span>
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateGame;
