import { useState } from "react";
import { searchIcon } from "~/utils/icons";
import type { WidgetProps } from "~/utils/types/widget";
import type { SearchEngine, SearchWidgetData } from "./types";

const fallbackEngine: SearchEngine = {
  key: "ecosia",
  displayName: "Ecosia",
  url: "https://www.ecosia.org/search?q=",
};

type Props = WidgetProps & {
  data: SearchWidgetData;
};

export default function SearchWidget(props: Props) {
  const startEngine = props.data.searchEngines[0]
    ? props.data.searchEngines[0]
    : fallbackEngine;
  const [engineLink, setEngineLink] = useState<string>(startEngine.url);
  const [searchString, setSearchString] = useState(engineLink);
  const [currentEngine, setCurrentEngine] = useState<SearchEngine["key"]>(
    startEngine.key,
  );

  function updateEngine(curEngine: SearchEngine["key"]) {
    setCurrentEngine(curEngine);
    const selectedEngine =
      props.data.searchEngines.find((e) => e.key === curEngine) ?? startEngine;
    setEngineLink(selectedEngine.url ?? startEngine.url);
  }

  function handleSearch(): boolean {
    const input = document.querySelector("input");
    if (!input) return false;

    setSearchString(engineLink + input.value.trim());
    if (engineLink === engineLink + input.value.trim()) {
      // if empty
      console.warn("No search string provided");
      return false;
    }

    return true;
  }

  window.addEventListener("keydown", (e) => {
    if (e.metaKey && e.key === "k") {
      const input: HTMLInputElement | null =
        document.querySelector("#searchbar");
      if (!input) return;
      input.focus();
    }
  });

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      if (!handleSearch()) return;

      setTimeout(() => {
        document.getElementById("searchButton")?.click();
      }, 50);
    } else if (event.key === "Escape") {
      const input = document.querySelector("input");
      if (!input) return;

      input.value = "";
      setSearchString("");
    } else if (event.shiftKey && event.key === "Tab") {
      event.preventDefault();
      selectNextEngine();
    }
  }

  function selectNextEngine() {
    const index = props.data.searchEngines.findIndex(
      (e) => e.key === currentEngine,
    );
    const nextIndex =
      index + 1 >= props.data.searchEngines.length ? 0 : index + 1;
    const nextEngine = props.data.searchEngines[nextIndex]?.key ?? "ecosia";

    updateEngine(nextEngine);
  }

  function searchWithEngine(chosenEngine: SearchEngine["key"]) {
    updateEngine(chosenEngine);
  }

  function setOutline(useOutline: boolean) {
    const inputContainer: HTMLDivElement | null = document.querySelector(
      "#searchbar-container",
    );
    if (!inputContainer) return;
    if (useOutline) {
      inputContainer.classList.add("outline");
      inputContainer.classList.add("outline-2");
      inputContainer.classList.add("outline-panal-100");
    } else {
      inputContainer.classList.remove("outline");
      inputContainer.classList.remove("outline-2");
      inputContainer.classList.remove("outline-panal-100");
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div
        className="mb-2 flex items-center justify-between rounded-full bg-foreground"
        id="searchbar-container"
      >
        <a
          href={searchString}
          target="_blank"
          id="searchButton"
          rel="noopener noreferrer"
          className="pl-2 text-black "
          onClick={handleSearch}
        >
          {searchIcon}
        </a>
        <input
          type="text"
          id="searchbar"
          className="w-full rounded-r-full py-2 pr-1 text-black focus:outline-none"
          placeholder="Search"
          onKeyDown={(event) => handleKeyDown(event)}
          onFocus={() => setOutline(true)}
          onBlur={() => setOutline(false)}
        />
        <kbd className="flex pl-2 pr-4 font-sans text-xs font-semibold text-slate-500">
          <abbr title="Command" className="no-underline">
            ⌘
          </abbr>{" "}
          K
        </kbd>
      </div>
      <div className="flex justify-center space-x-2 ">
        {(props.data.searchEngines || [fallbackEngine]).map(
          (singleEngine, index) =>
            singleEngine.key === currentEngine ? (
              <button
                key={index}
                className="bg-panal-200 hover:bg-panal-300 active:bg-panal-400 rounded-md p-1 px-2 text-xs text-foreground"
                onClick={() => searchWithEngine(singleEngine.key)}
              >
                {singleEngine.displayName}
              </button>
            ) : (
              <button
                key={index}
                className="rounded-md bg-gray-100 p-1 px-2 text-xs text-black hover:bg-gray-300 active:bg-gray-400"
                onClick={() => searchWithEngine(singleEngine.key)}
              >
                {singleEngine.displayName}
              </button>
            ),
        )}
      </div>
    </div>
  );
}
