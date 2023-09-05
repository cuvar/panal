import { linkIcon } from "~/utils/icons";

type Props = {
  text: string;
  href: string;
  tab?: "new" | "same";
};

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

export default function LinkWidget(props: Props) {
  return (
    <>
      <a
        href={props.href}
        target={props.tab === "same" ? "_self" : "_blank"}
        rel={props.tab === "same" ? "" : "noopener noreferrer"}
        className={LINK_CLASS}
      >
        {linkIcon}
      </a>
      <span className="w-full text-center text-sm">{props.text}</span>
    </>
  );
}
