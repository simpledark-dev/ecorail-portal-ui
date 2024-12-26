import { Icons } from "@/components/icons";
import { Link } from "react-router-dom";

interface BreadcrumbProps {
  items: { label: string; href: string }[];
}

export const Breadcrumb = (props: BreadcrumbProps) => {
  const { items } = props;

  return (
    <nav aria-label="breadcrumb" className="w-fit rounded-[8px] bg-white/[15%] px-6 py-2">
      <ol className="flex items-center">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <Link
              to={item.href}
              className="!decoration-white underline-offset-2 transition-colors duration-150 hover:underline"
            >
              <p className="line-clamp-1 whitespace-nowrap text-sm font-medium text-neutral-100 transition-colors duration-150 hover:text-neutral-0">
                {item.label}
              </p>
            </Link>
            {index < items.length - 1 && (
              <Icons.ChevronRight className="mx-2 h-5 w-5 fill-neutral-100" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
