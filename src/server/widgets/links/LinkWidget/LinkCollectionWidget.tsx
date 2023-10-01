import { useState } from "react";
import { isPositioning } from "~/utils/guards/widgets";
import { useDetectMobile, useDetectScreenSize } from "~/utils/hooks";
import { plusIcon } from "~/utils/icons";
import type { ScreenSizePositioning } from "~/utils/types/widget";
import type { LinkWidgetData } from "../types";
import LinkContainer from "./LinkContainer";
import LinkWidget from "./LinkWidget";

type Props = {
  data: LinkWidgetData;
  layout: ScreenSizePositioning;
};

export default function LinkCollectionWidget(props: Props) {
  const [data, setData] = useState<LinkWidgetData>(props.data);
  const currentScreenSize = useDetectScreenSize();

  function addLink(_e: React.MouseEvent<HTMLButtonElement>) {
    // todo functionality -> update upstash with real data
    setData([
      ...data,
      {
        text: "New Link",
        href: "https://example.com",
        tab: "new",
      },
    ]);
  }
  const COL_COUNT = isPositioning(props.layout)
    ? props.layout.w + 1
    : props.layout[currentScreenSize].w; // fix: i feel like this is not quite right
  const ROW_COUNT = isPositioning(props.layout)
    ? props.layout.h
    : props.layout[currentScreenSize].h;
  const SMALL_MAX_COL_COUNT = COL_COUNT; // todo: make this dynamic; move this to `const` file
  const SMALL_COL_COUNT = Math.min(COL_COUNT, SMALL_MAX_COL_COUNT);

  return (
    // <div className="grid grid-cols-3 grid-rows-4 md:grid-cols-4 md:grid-rows-3 lg:grid-cols-6 lg:grid-rows-2 xl:grid-cols-6 xl:grid-rows-2 gap-4">
    <div
      className={`grid h-full w-full grid-cols-${SMALL_COL_COUNT} md:grid-cols-${COL_COUNT} grid-rows-${ROW_COUNT} place-items-center`}
    >
      {useDetectMobile() ? (
        <>
          {data.slice(0, SMALL_COL_COUNT * ROW_COUNT).map((link, index) => (
            <LinkContainer key={index}>
              <LinkWidget text={link.text} href={link.href} tab={link.tab} />
            </LinkContainer>
          ))}
          {data.length < SMALL_COL_COUNT * ROW_COUNT && (
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
          {data.length < COL_COUNT * ROW_COUNT && (
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
