type TScopeMenuItem = {
  icon: React.ReactElement;
  label: string;
  action: () => void;
};

export interface MenuProps {
  items: TScopeMenuItem[];
}

export const Menu = ({ items }: MenuProps) => {
  return (
    <nav
      className="w-fit min-w-[180px] overflow-hidden rounded-md border border-gray-400 bg-white py-2 shadow-sm"
      aria-label="menu"
      role="menu"
    >
      <ul>
        {items.map((item, index) => (
          <li key={index} role="menuitem">
            <div>
              <MenuItem item={item} />
              {index < items.length - 1 && <div className="h-[1px] w-full bg-gray-400" />}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

interface MenuItemProps {
  item: TScopeMenuItem;
}

const MenuItem = (props: MenuItemProps) => {
  const { item } = props;

  return (
    <button
      className="flex w-full items-center gap-3 px-4 py-2 text-sm text-neutral-500 transition-colors duration-150 hover:bg-blue-100 active:bg-blue-200"
      aria-label={item.label}
      onClick={item.action}
    >
      <div className="shrink-0">{item.icon}</div>
      <p className="text-sm font-medium">{item.label}</p>
    </button>
  );
};
