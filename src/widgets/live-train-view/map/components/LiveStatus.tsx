export const LiveStatus = () => {
  return (
    <div className="flex items-center justify-center gap-2 rounded-[8px] border border-gray-400 bg-white px-3 py-1">
      <p className="text-navy-600 text-xs font-semibold">Live</p>
      <div className="h-[6px] w-[6px] shrink-0 rounded-full bg-blue-400" />
    </div>
  );
};
