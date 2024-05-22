import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import mapWidgets from "~/client/services/mapWidgetsService";
import transformLayoutsForGrid from "~/client/services/transformLayoutsService";
import { type AdjustedWidgetLayout } from "~/server/domain/layout/adjustedWidgetLayout";
import ErrorWidget from "~/server/widgets/ErrorWidget";
import LoadingWidget from "~/server/widgets/LoadingWidget";
import { api } from "~/utils/api";
import { useDetectScreenSize } from "~/utils/hooks";
import { cogIcon, eyeOffIcon } from "~/utils/icons";
import Log from "~/utils/log";
import {
  editedWidgetLayoutAtom,
  toastTextAtom,
  toastTypeAtom,
} from "~/utils/store";
import { Button } from "./ui/button";

type Props = {
  editMode: boolean;
  widget: AdjustedWidgetLayout;
};

export default function WidgetWrapper(props: Props) {
  const [, setToastText] = useAtom(toastTextAtom);
  const [, setToastType] = useAtom(toastTypeAtom);
  const [, setEditedWidgetLayout] = useAtom(editedWidgetLayoutAtom);
  const currentScreenSize = useDetectScreenSize();
  const router = useRouter();

  const getAllLayoutsQuery = api.layout.getAll.useQuery(undefined, {
    enabled: false,
  });
  const getConfigQuery = api.data.getDataForWidget.useQuery({
    id: props.widget.id,
  });
  const hideWidgetMutation = api.layout.setHide.useMutation({
    onSuccess: async () => {
      const res = await getAllLayoutsQuery.refetch();
      setToastType("success");
      setToastText(`Hid widget successfully`);
      if (res.data) {
        const transformed = transformLayoutsForGrid(res.data, false);
        setEditedWidgetLayout(transformed);
      }

      setTimeout(() => {
        setToastText("");
      }, 1500);
    },
    onError: (error) => {
      setToastType("error");
      setToastText(`Hiding failed`);
      setTimeout(() => {
        setToastText("");
      }, 1500);
      Log(error, "error");
    },
  });

  function handleHideWidget() {
    hideWidgetMutation.mutate({
      hide: true,
      screenSize: currentScreenSize,
      widget: props.widget,
    });
  }

  function handleNavigate(path: string) {
    void (async () => await router.push(path))();
  }

  return (
    <div className={`flex h-full w-full items-center justify-center`}>
      {props.editMode && (
        <div className="absolute z-20 flex h-full w-full items-start justify-end space-x-6 rounded-md bg-foreground bg-opacity-30 px-2 pt-2">
          <Button
            className="text-inverted"
            onTouchStart={handleHideWidget}
            onClick={handleHideWidget}
            variant="ghost"
            size={"sm"}
          >
            {eyeOffIcon}
          </Button>
          <Link
            href={`/w/${props.widget.id}`}
            onTouchStart={() => handleNavigate(`/w/${props.widget.id}`)}
            className="text-inverted"
          >
            {cogIcon}
          </Link>
        </div>
      )}
      {getConfigQuery.isLoading && <LoadingWidget />}
      {getConfigQuery.error && <ErrorWidget msg={"Data cannot be loaded"} />}
      {!getConfigQuery.isLoading &&
        getConfigQuery.data &&
        mapWidgets(props.widget, getConfigQuery.data)}
    </div>
  );
}
