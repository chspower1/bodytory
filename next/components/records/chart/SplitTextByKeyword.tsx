interface SplitTextProps {
  text: string;
  clickedKeyword: string;
}

const SplitTextByKeyword = ({ text, clickedKeyword }: SplitTextProps) => {
  return (
    <>
      {text.split(clickedKeyword).map((splitText, idx, arr) =>
        idx === arr.length - 1 ? (
          <span>{splitText}</span>
        ) : (
          <span>
            {splitText}
            <span className="keyword-mark">{clickedKeyword}</span>
          </span>
        ),
      )}
    </>
  );
};

export default SplitTextByKeyword;
