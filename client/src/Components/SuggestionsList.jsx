import { Loader2 } from "lucide-react";

export default function SuggestionsList({
  suggestions = [],
  highlight,
  dataKey,
  onSuggestionClick,
  loading,
  error,
  class: className,
}) {
  const suggestionsLength = suggestions.length;

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));

    return (
      <span>
        {parts.map((part, index) => {
          return part.toLowerCase() === highlight.toLowerCase() ? (
            <b key={index}>{part}</b>
          ) : (
            part
          );
        })}
      </span>
    );
  };

  return (
    <>
      {(suggestions.length > 0 || loading || error) && (
        <div className={className}>
          <ul className="max-h-[290px] overflow-y-auto">
            {error && (
              <li className="p-3 border-b-2 border-gray-300">{error}</li>
            )}
            {loading && (
              <li className="p-4 text-base border-b-2 border-gray-300 flex items-center">
                <Loader2 className="mr-2 size-4 animate-spin" />
                <span>Loading....</span>
              </li>
            )}
            {suggestions.map((suggestion, index) => {
              return (
                <li
                  className={`p-4 border-b-2 ${
                    suggestionsLength === index + 1 ? "" : "border-gray-300"
                  }`}
                  key={index}
                  onClick={() => onSuggestionClick(suggestion)}
                  id={`suggestion-${index}`}
                >
                  {getHighlightedText(suggestion[dataKey], highlight)}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* {suggestions.map((suggestion, index) => {
        const currSuggestion = dataKey ? suggestion[dataKey] : suggestion;

        return (
          <li
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            id={`suggestion-${index}`}
          >
            {console.log(getHighlightedText(currSuggestion, highlight))}
          </li>
        );
      })} */}
    </>
  );
}
