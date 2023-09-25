import LinkWidget from "./LinkWidget";
import LinkContainer from "./LinkContainer";
import { useState } from "react";
import { useDetectMobile } from "~/utils/hooks";
import { plusIcon } from "~/utils/icons";

type Props = {
  colCount: number;
  rowCount: number;
};

const predefinedLinks: LinkWidget[] = [
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

export default function LinkCollectionWidget(props: Props) {
  const [data, setData] = useState<LinkWidget[]>(predefinedLinks);

  function addLink(_e: React.MouseEvent<HTMLButtonElement>) {
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

  const SMALL_MAX_COL_COUNT = 4;
  const SMALL_COL_COUNT = Math.min(props.colCount, SMALL_MAX_COL_COUNT);

  return (
    // <div className="grid grid-cols-3 grid-rows-4 md:grid-cols-4 md:grid-rows-3 lg:grid-cols-6 lg:grid-rows-2 xl:grid-cols-6 xl:grid-rows-2 gap-4">
    <div
      className={`grid h-full w-full grid-cols-${SMALL_COL_COUNT} md:grid-cols-${props.colCount} grid-rows-${props.rowCount} place-items-center`}
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
                className="flex h-20 w-full items-center justify-center rounded-md bg-gray-200 text-black"
                onClick={addLink}
              >
                {plusIcon}
              </button>
              <span className="w-full text-center text-sm">Add Link</span>
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
                className="flex h-20 w-full items-center justify-center rounded-md bg-gray-200 text-black"
                onClick={addLink}
              >
                {plusIcon}
              </button>
              <span className="w-full text-center text-sm">Add Link</span>
            </LinkContainer>
          )}
        </>
      )}
    </div>
  );
}
