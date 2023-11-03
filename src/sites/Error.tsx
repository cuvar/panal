import SiteWrapper from "~/components/SiteWrapper";

export default function ErrorPage(props: { error: string }) {
  return (
    <SiteWrapper>
      <div className="flex h-screen w-full flex-col items-center justify-start">
        <h1 className="text-xl font-bold">An error occurred </h1>
        <p>{props.error}</p>
      </div>
    </SiteWrapper>
  );
}
