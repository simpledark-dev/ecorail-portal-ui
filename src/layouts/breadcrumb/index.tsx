import { Icons } from "@/components/icons";

interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

export const Breadcrumb = (props: BreadcrumbProps) => {
  const { items } = props;

  return (
    <nav aria-label="breadcrumb" className="w-fit rounded-[8px] bg-white/15 px-6 py-2">
      <ol className="flex items-center">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <a href={item.href}>
              <p className="whitespace-nowrap text-sm text-neutral-100 transition-colors duration-150 hover:text-neutral-0">
                {item.label}
              </p>
            </a>
            {index < items.length - 1 && (
              <Icons.ChevronRight className="mx-2 h-5 w-5 fill-neutral-100" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
