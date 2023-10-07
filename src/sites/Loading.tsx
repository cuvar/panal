import SiteWrapper from "~/components/SiteWrapper";

export default function LoadingSpinner() {
  return (
    <SiteWrapper>
      <div className="flex h-full w-full items-center justify-center">
        Loading...
      </div>
    </SiteWrapper>
  );
}
