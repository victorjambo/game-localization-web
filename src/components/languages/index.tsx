import LangIcon from "./LangIcon";

const Languages: React.FC<{ available_languages: Array<string> }> = ({ available_languages }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-shrink-0 -space-x-1">
        {available_languages.slice(0, 4).map((lang) => (
          <LangIcon key={lang} lang={lang} />
        ))}
      </div>
      {available_languages.length > 4 ? (
        <span className="flex-shrink-0 text-xs leading-5 font-medium">
          +{available_languages.length - 4}
        </span>
      ) : null}
    </div>
  );
};

export default Languages;
