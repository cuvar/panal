import SiteWrapper from "~/components/SiteWrapper";

export default function ErrorPage(props: { error: string }) {
  return (
    <SiteWrapper>
      <p>An error occurred </p>
      <p>{props.error}</p>
    </SiteWrapper>
  );
}
