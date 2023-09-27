import { useState } from "react";
import { searchIcon } from "~/utils/icons";
import type { SearchEngine, SearchWidgetData } from "./types";

const engines: SearchEngine[] = [
  {
    key: "ecosia",
    displayName: "Ecosia",
    url: "https://www.ecosia.org/search?q=",
  },
  {
    key: "google",
    displayName: "Google",
    url: "https://google.com/search?q=",
  },
  {
    key: "duckduckgo",
    displayName: "DuckDuckGo",
    url: "https://duckduckgo.com/?q=",
  },
  {
    key: "gdrive",
    displayName: "Google Drive",
    url: "https://drive.google.com/drive/search?q=",
  },
];

export default function SearchWidget(props: SearchWidgetData) {
  // todo: check length of array and have a fallback to ecosia

  const [engineLink, setEngineLink] = useState<string>(engines[0]!.url);
  const [searchString, setSearchString] = useState(engineLink);
  const [currentEngine, setCurrentEngine] = useState<SearchEngine["key"]>(
    engines[0]!.key,
  );

  function updateEngine(curEngine: SearchEngine["key"]) {
    setCurrentEngine(curEngine);
    const selectedEngine =
      engines.find((e) => e.key === curEngine) ?? engines[0]!;
    setEngineLink(selectedEngine?.url); // todo: rework
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
    const index = engines.findIndex((e) => e.key === currentEngine);
    const nextIndex = index + 1 >= engines.length ? 0 : index + 1;
    const nextEngine = engines[nextIndex]?.key ?? "ecosia";

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
        className="mb-2 flex items-center justify-between rounded-full bg-white"
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
        {engines.map((singleEngine, index) =>
          singleEngine.key === currentEngine ? (
            <button
              key={index}
              className="rounded-md bg-panal-200 p-1 px-2 text-xs text-white hover:bg-panal-300 active:bg-panal-400"
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
