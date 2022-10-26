export default function TimeWidget() {
  let formatedDate: string = "";
  updateDate();

  setInterval(function () {
    updateDate();
  }, 1000);

  function updateDate() {
    formatedDate = Intl.DateTimeFormat("de-DE", {
      hour: "numeric",
      minute: "numeric",
    }).format(Date.now());
  }
  return (
    <div className="text-6xl flex justify-center items-center my-2">
      {formatedDate}
    </div>
  );
}
