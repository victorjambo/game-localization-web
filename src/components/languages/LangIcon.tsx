const getBackgroundColor = (str: any) => {
  let stringUniqueHash = [...str].reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return `hsl(${stringUniqueHash % 360}, 95%, 35%)`;
};

const LangIcon: React.FC<{ lang: string }> = ({ lang }) => {
  const color = getBackgroundColor(lang);

  return (
    <div
      className="text-center text-xs p-2 ring-2 ring-slate-200 rounded-full uppercase text-white"
      style={{ backgroundColor: color }}
    >
      {lang}
    </div>
  );
};

export default LangIcon;
