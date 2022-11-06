import LinkWidget from "./LinkWidget";
import LinkContainer from "./LinkContainer";
import { useState } from "react";
import { useDetectMobile } from "../../utils/hooks";

interface IProps {
  colCount: number;
  rowCount: number;
}

const predefinedLinks: LinkData[] = [
  {
    text: "GitHub",
    href: "https://github.com/cuvar",
    tab: "new",
  },
  {
    text: "Google Calendar",
    href: "https://calendar.google.com/",
    tab: "new",
  },
  {
    text: "Panal repo",
    href: "https://github.com/cuvar/panal",
    tab: "new",
  },
];

export default function LinkCollectionWidget(props: IProps) {
  const [data, setData] = useState<LinkData[]>(predefinedLinks);

  function addLink(e: React.MouseEvent<HTMLButtonElement>) {
    // todo functionality
    setData([
      ...data,
      {
        text: "New Link",
        href: "https://example.com",
        tab: "new",
      },
    ]);
  }
  // const isMobile = useDetectMobile();

  const SMALL_MAX_COL_COUNT = 3;
  const SMALL_COL_COUNT = Math.min(props.colCount, SMALL_MAX_COL_COUNT);

  return (
    // <div className="grid grid-cols-3 grid-rows-4 md:grid-cols-4 md:grid-rows-3 lg:grid-cols-6 lg:grid-rows-2 xl:grid-cols-6 xl:grid-rows-2 gap-4">
    <div
      className={`grid w-full h-full grid-cols-${SMALL_COL_COUNT} md:grid-cols-${props.colCount} grid-rows-${props.rowCount} place-items-center`}
    >
      {useDetectMobile() ? (
        <>
          {data
            .slice(0, SMALL_COL_COUNT * props.rowCount)
            .map((link, index) => (
              <LinkContainer key={index}>
                <LinkWidget text={link.text} href={link.href} tab={link.tab} />
              </LinkContainer>
            ))}
          {data.length < SMALL_COL_COUNT * props.rowCount && (
            <LinkContainer>
              <button
                className="bg-gray-200 text-black rounded-md w-full h-20 flex justify-center items-center"
                onClick={addLink}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
              <span className="text-sm w-full text-center">Add Link</span>
            </LinkContainer>
          )}
        </>
      ) : (
        <>
          {data.map((link, index) => (
            <LinkContainer key={index}>
              <LinkWidget text={link.text} href={link.href} tab={link.tab} />
            </LinkContainer>
          ))}
          {data.length < props.colCount * props.rowCount && (
            <LinkContainer>
              <button
                className="bg-gray-200 text-black rounded-md w-full h-20 flex justify-center items-center"
                onClick={addLink}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
              <span className="text-sm w-full text-center">Add Link</span>
            </LinkContainer>
          )}
        </>
      )}
    </div>
  );
}
