interface IProps {
  text: string;
  href: string;
  tab?: "new" | "same";
}

// ! this needs a web scraper from the backend
// function getFavicon() {
// 	const linkTags = document.querySelectorAll("[rel='icon']");
// 	const faviconRefs = linkTags.forEach((linkTag) => {
// 		if (linkTag.getAttribute('href') !== null) {
// 			return linkTag.getAttribute('href');
// 		}
// 	});
// <!-- todo: look in brave dev tools for how they do it

// 	console.log(faviconRefs);
// }

const LINK_CLASS =
  "bg-teal-200 hover:bg-teal-300 text-black p-5 rounded-md w-full h-20 flex justify-center items-center";

export default function LinkWidget(props: IProps) {
  return (
    <>
      {props.tab === "same" ? (
        <a href={props.href} className={LINK_CLASS}>
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
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
        </a>
      ) : (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
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
              d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
            />
          </svg>
        </a>
      )}
      <span className="text-sm w-full text-center">{props.text}</span>
    </>
  );
}
