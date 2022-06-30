interface IProps {
  title: string;
}

function Footer(props: IProps) {
  return (
    <div className="w-full flex justify-center py-10">
      <p>{props.title ?? "panal"}</p>
    </div>
  );
}
export default Footer;
