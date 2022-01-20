import LangIcon from "./LangIcon";

interface IProps {
  available_languages: Array<string>;
  showAll?: boolean;
}
const Languages: React.FC<IProps> = ({
  available_languages,
  showAll
}) => {
  let languages = available_languages.slice(0, 4);

  if (showAll) {
    languages = available_languages
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex flex-shrink-0 -space-x-1">
        {languages.map((lang) => (
          <LangIcon key={lang} lang={lang} />
        ))}
      </div>
      {!showAll && available_languages.length > 4 ? (
        <span className="flex-shrink-0 text-xs leading-5 font-medium">
          +{available_languages.length - 4}
        </span>
      ) : null}
    </div>
  );
};

export default Languages;
