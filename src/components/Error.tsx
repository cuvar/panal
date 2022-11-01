export default function ErrorPage(props: { error: string }) {
  return (
    <>
      <p>An error occurred </p>
      <p>{props.error}</p>
    </>
  );
}
