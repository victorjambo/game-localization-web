import { Dispatch, SetStateAction, useState } from "react";
import { getBackgroundColor } from "./LangIcon";

const LanguageTags: React.FC<{
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
  setCanDispatch?: Dispatch<SetStateAction<boolean>>;
}> = ({ tags, setTags, setCanDispatch = () => null }) => {
  const [input, setInput] = useState("");
  const [isKeyReleased, setIsKeyReleased] = useState(false);

  const onChange = (e: any) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e: any) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (
      (key === "," || key === " ") &&
      trimmedInput.length &&
      !tags.includes(trimmedInput) &&
      /^[A-Za-z]{2}$/.test(trimmedInput)
    ) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
      setCanDispatch(true);
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag as any);
      setCanDispatch(true);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
  };

  const deleteTag = (index: number) => {
    setTags((prevState) => prevState.filter((_, i) => i !== index));
    setCanDispatch(true);
  };

  return (
    <div className="flex overflow-scroll w-full rounded-md flex-wrap">
      <div className="flex space-x-3">
        {tags.map((tag, index) => {
          const backgroundColor = getBackgroundColor(tag);
          return (
            <div
              key={tag}
              className="flex items-center cursor-default relative my-2 px-2 ring-2 ring-slate-200 uppercase text-white rounded-md whitespace-nowrap"
              style={{
                backgroundColor,
              }}
            >
              <span>{tag}</span>
              <button
                className="absolute -top-4 -right-2 text-2xl text-black"
                onClick={() => deleteTag(index)}
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>
      <input
        id="languages"
        value={input}
        placeholder="Enter a languange"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onChange={onChange}
        className="rounded-md px-5 py-4 w-full border border-gray-400 hover:border-gray-600"
      />
    </div>
  );
};

export default LanguageTags;
