import SiteWrapper from "~/components/SiteWrapper";

export default function LoadingSpinner() {
  return (
    <SiteWrapper>
      <div className="flex h-screen w-full items-center justify-center italic">
        Loading...
      </div>
    </SiteWrapper>
  );
}
