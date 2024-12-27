import { Meta, StoryFn } from "@storybook/react";
import { DialogProvider, useDialog } from "..";
import { Icons } from "@/components/icons";

export default {
  title: "Components/Dialog",
  component: DialogProvider,
  decorators: [
    (Story: any) => (
      <DialogProvider>
        <Story />
      </DialogProvider>
    ),
  ],
} as Meta;

export const Default: StoryFn = () => {
  const dialog = useDialog();

  const handleCreateDialog = () => {
    dialog.create({
      title: "Dialog Title",
      body: <p>This is a dialog body</p>,
      actions: (instance) => <button onClick={() => dialog.remove(instance.id)}>Close</button>,
    });
  };

  return (
    <div>
      <button onClick={handleCreateDialog}>Show Dialog</button>
    </div>
  );
};

export const NoChangesDetected: StoryFn = () => {
  const dialog = useDialog();

  const handleCreateNoChangesDialog = () => {
    dialog.create({
      title: "No Changes Detected",
      icon: <Icons.Info aria-hidden="true" className="h-10 w-10 shrink-0 fill-[#507CCF]" />,
      body: (
        <div className="rounded-[8px] bg-white px-[16px] py-[12px] drop-shadow-[0_4px_8px_#E5E5E526]">
          <p className="m-0 p-0 text-sm font-medium leading-[24px] text-[#5F7089]">
            The uploaded file does not contain any changes to the TSOs. Please review the file and
            try again if necessary.
          </p>
        </div>
      ),
      actions: (instance) => (
        <button
          type="button"
          className="rounded-[8px] border-none bg-[#507CCF] px-5 py-2 outline-none transition-colors duration-100 hover:bg-[#5885d8] active:bg-[#456db8]"
          onClick={() => {
            dialog.remove(instance.id);
          }}
        >
          <span className="text-sm font-medium text-white">OK</span>
        </button>
      ),
    });
  };

  return <button onClick={handleCreateNoChangesDialog}>Show No Changes Dialog</button>;
};

export const NoTSOInfoFound: StoryFn = () => {
  const dialog = useDialog();

  const handleCreateNoTSOsInfoFound = () => {
    dialog.create({
      title: "No TSOs Info Found",
      icon: <Icons.Info aria-hidden="true" className="h-10 w-10 shrink-0 fill-[#CF5050]" />,
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
      actions: (instance) => (
        <button
          type="button"
          className="rounded-[8px] border-none bg-[#CF5050] px-5 py-2 outline-none transition-colors duration-100 hover:bg-[#da5959] active:bg-[#be4848]"
          onClick={() => {
            dialog.remove(instance.id);
          }}
        >
          <span className="text-sm font-medium text-white">Close</span>
        </button>
      ),
    });
  };

  return <button onClick={handleCreateNoTSOsInfoFound}>Show No TSOs Info Found</button>;
};
