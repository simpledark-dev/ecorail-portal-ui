import { Meta, StoryFn } from "@storybook/react";
import { Icons } from "@/components/icons";
import { NoticeContainer, NoticeProvider, useNotice } from "..";
import { Spinner } from "@/components/spinner";
import React from "react";
import { TNoticeInstance } from "../types";

export default {
  title: "Components/Notice",
  component: NoticeProvider,
  decorators: [
    (Story: any) => (
      <div className="relative h-full w-full">
        <NoticeProvider>
          <NoticeContainer />
          <Story />
        </NoticeProvider>
      </div>
    ),
  ],
} as Meta;

export const Default: StoryFn = () => {
  const notice = useNotice();

  const handleCreateDialog = () => {
    notice.create({
      title: "Dialog Title",
      body: <p>This is a dialog body</p>,
      actions: (instance) => <button onClick={() => notice.remove(instance.id)}>Close</button>,
    });
  };

  return (
    <div>
      <button onClick={handleCreateDialog}>Show Dialog</button>
    </div>
  );
};

export const WithCloseable: StoryFn = () => {
  const notice = useNotice();

  const handleCreateNoChangesNotice = () => {
    notice.create({
      title: "No Changes Detected",
      icon: <Icons.Info aria-hidden="true" className="h-10 w-10 shrink-0 fill-[#507CCF]" />,
      closeable: true,
      body: (
        <div className="rounded-[8px] bg-white px-[16px] py-[12px] drop-shadow-[0_4px_8px_#E5E5E526]">
          <p className="m-0 p-0 text-sm font-medium leading-[24px] text-[#5F7089]">
            The uploaded file does not contain any changes to the TSOs. Please review the file and
            try again if necessary.
          </p>
        </div>
      ),
    });
  };

  return <button onClick={handleCreateNoChangesNotice}>Show No Changes Notice</button>;
};

export const WithCollapse: StoryFn = () => {
  const notice = useNotice();

  const handleCreateNoTSOsInfoFound = () => {
    notice.create({
      title: "No TSOs Info Found",
      icon: <Icons.Info aria-hidden="true" className="h-10 w-10 shrink-0 fill-[#CF5050]" />,
      collapsible: true,
      body: (
        <div className="rounded-[8px] border border-[#CF5050] bg-[#CF5050]/10 px-[16px] py-[12px] drop-shadow-[0_4px_8px_#E5E5E526]">
          <div className="m-0 p-0 text-sm font-medium leading-[24px] text-[#CF5050]">
            <span>
              No TSOs info found for these subdivisions or they are out of the subdivisions milepost
              ranges. Provided subdivisions:
            </span>
            <ul className="ml-6 list-item list-disc">
              <li>MONTREAL</li>
              <li>KINGSTON</li>
            </ul>
            <span>
              Please ensure the document is a valid document that contains TSO information for the
              provided subdivisions.
            </span>
          </div>
        </div>
      ),
    });
  };

  return <button onClick={handleCreateNoTSOsInfoFound}>Show No TSOs Info Found</button>;
};

export const WithAutoClose: StoryFn = () => {
  const notice = useNotice();

  const handleCreateAutoCloseNotice = () => {
    notice.create({
      title: "No Changes Detected",
      icon: <Icons.Info aria-hidden="true" className="h-10 w-10 shrink-0 fill-[#507CCF]" />,
      closeable: true,
      autoClose: {
        timeout: 2000,
      },
      body: (
        <div className="rounded-[8px] bg-white px-[16px] py-[12px] drop-shadow-[0_4px_8px_#E5E5E526]">
          <p className="m-0 p-0 text-sm font-medium leading-[24px] text-[#5F7089]">
            The uploaded file does not contain any changes to the TSOs. Please review the file and
            try again if necessary.
          </p>
        </div>
      ),
    });
  };

  return <button onClick={handleCreateAutoCloseNotice}>Show Auto Close Notice</button>;
};

export const WithLoading: StoryFn = () => {
  const notice = useNotice();

  const [loading, setLoading] = React.useState(false);

  const [noticeInstances, setNoticeInstances] = React.useState<TNoticeInstance[]>([]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [loading]);

  React.useEffect(() => {
    if (loading === false && noticeInstances.length > 0) {
      noticeInstances.forEach((instance) => {
        notice.remove(instance.id);
      });
    }
  }, [loading, noticeInstances]);

  const handleCreateLoadingNotice = () => {
    setLoading(true);
    const newNoticeInstance = notice.create({
      title: "Loading Data",
      icon: <Spinner aria-hidden="true" size={28} stroke={3} className="shrink-0 fill-[#507CCF]" />,
      closeable: false,
      collapsible: false,
    });
    setNoticeInstances((prev) => [...prev, newNoticeInstance]);
  };

  return <button onClick={handleCreateLoadingNotice}>Show Loading Notice</button>;
};
