import SearchWidget from "./SearchWidget";
import TimeWidget from "./TimeWidget";
import CalendarWidget from "./CalendarWidget";
import LinkCollectionWidget from "./LinkWidget/LinkCollectionWidget";
import styles from "./WidgetView.module.css";

interface IProps {
  data: WidgetViewData;
}

export default function WidgetView(props: IProps) {
  return (
    <>
      <div
        className={`h-full grid ${styles["auto-rows"]} ${styles["sm-cols-3"]} ${styles["md-cols-6"]} ${styles["xl-cols-10"]} gap-4 sm:gap-6 bg-green-500`}
      >
        <div className=" bg-blue-500">Hello</div>
        <div className="bg-yellow-500">Hello</div>
        <div className="bg-red-500 col-span-3 row-span-3">Hello</div>
        {/* <div className=" bg-blue-500">Hello</div>
        <div className="bg-yellow-500">Hello</div>
        <div className="bg-red-500">Hello</div>
        <div className=" bg-blue-500">Hello</div>
        <div className="bg-yellow-500">Hello</div>
        <div className="bg-red-500">Hello</div>
        <div className=" bg-blue-500">Hello</div>
        <div className="bg-yellow-500">Hello</div>
        <div className="bg-red-500">Hello</div> */}
      </div>
    </>
  );
}

// grid-cols-3 md:grid-cols-6 xl:grid-cols-10

// <div>
//   {/* w200xh100 */}
//   <TimeWidget />
//   {/* w300xh100 */}
//   <SearchWidget />
//   {/* w400xh400 */}
//   <LinkCollectionWidget />
//   {/* w300xh300 */}
//   <CalendarWidget calendarData={props.data.calendarData} />
// </div>
