interface IProps {
  title: string;
}
function Navbar(props: IProps) {
  return (
    <div className="w-full flex justify-begin py-10">
      <h1 className="text-2xl ml-10">{props.title ?? "panal"}</h1>
    </div>
  );
}
export default Navbar;
