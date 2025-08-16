"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

// Define the structure for menu items
interface MenuItem {
  title: string;
  href?: string;
  description?: string;
  children?: MenuItem[];
}

// Sample menu data - you can customize this
const menuItems: MenuItem[] = [
  {
    title: "Home FRGroup",
    href: "/",
    description: "Home de FRGroup",
  },
  {
    title: "Corredores de Seguros",
    href: "/corredores-de-seguros",
    description: "Learn more about our company",
    children: [
      {
        title: "Home Seguros",
        href: "/corredores-de-seguros",
        description: "Todos nuestros servicios de seguros",
      },
      {
        title: "Seguros Empresas",
        href: "/corredores-de-seguros/seguros-empresas",
      },
      {
        title: "Seguros Personales",
        href: "/corredores-de-seguros/seguros-personales",
      },
      {
        title: "",
        href: "",
      },
      {
        title: "Contacto",
        href: "/corredores-de-seguros/contacto",
      },

      {
        title: "Equipo",
        href: "/corredores-de-seguros/equipo",
      },
    ],
  },
  {
    title: "Investment",
    href: "/investment",
    description: "Learn more about our company",
    children: [
      {
        title: "Home Investment",
        href: "/investment",
        description: "Todos nuestros servicios de inversión",
      },
      {
        title: "Asesoría Financiera",
        href: "/investment/asesoria-financiera",
      },
      {
        title: "Reestructuración de Pasivos",
        href: "/investment/reestructuracion-de-pasivos",
      },
      {
        title: "Re-financiamiento",
        href: "/investment/re-financiamiento",
      },
      {
        title: "",
        href: "#",
      },
      {
        title: "Nosotros",
        href: "/investment/nosotros",
      },
      {
        title: "Equipo",
        href: "/investment/equipo",
      },
      {
        title: "Trabaja con Nosotros",
        href: "/investment/trabaja-con-nosotros",
      },
    ],
  },
  {
    title: "Activos",
    href: "/activos",
    children: [
      {
        title: "Home Activos",
        href: "/activos",
        description: "Todos nuestros servicios de activos",
      },
      {
        title: "Servicios para Propietarios",
        href: "/activos",
      },
      {
        title: "Servicios para Arrendatarios/Compradores",
        href: "/activos",
      },
      {
        title: "Noticias",
        href: "/activos",
      },
      {
        title: "",
        href: "#",
      },
      {
        title: "Nosotros",
        href: "/activos/nosotros",
      },
      {
        title: "Equipo",
        href: "/activos/equipo",
      },
      {
        title: "Trabaja con Nosotros",
        href: "/activos/trabaja-con-nosotros",
      },
    ],
  },
];

// ListItem component for dropdown items
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    description?: string;
  }
>(({ className, title, description, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-destacado hover:text-white text-white text-3xl ",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          {description && (
            <p className="line-clamp-2 text-sm leading-snug text-white/70">
              {description}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

interface NavigationMenuProps {
  items?: MenuItem[];
  className?: string;
}

// Mobile menu component
function MobileMenu({ items = menuItems }: NavigationMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white hover:text-gray-300 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className={
            "absolute top-full left-0 right-0  bg-primario w-full !max-w-full p-5"
          }
        >
          <nav className="text-white">
            <ul className="space-y-4">
              {items.map((item, index) => (
                <li key={index}>
                  {item.children ? (
                    <div>
                      <div className="text-white font-medium text-lg mb-2">
                        {item.title}
                      </div>

                      <ul className="ml-4 space-y-2">
                        {item.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <Link
                              href={child.href || "#"}
                              className="text-white/80 hover:text-white transition-colors block py-1"
                              onClick={() => setIsOpen(false)}
                            >
                              {child.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      className="text-white hover:text-gray-300 transition-colors block text-lg font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.title}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

// Desktop navigation menu with white text styling
export function MainNavigationMenu({
  items = menuItems,
  className,
}: NavigationMenuProps) {
  return (
    <div className="hidden md:block">
      <NavigationMenu className={cn("max-w-none", className)}>
        <NavigationMenuList className="text-white">
          {items.map((item, index) => (
            <NavigationMenuItem key={index}>
              {item.children ? (
                <>
                  <NavigationMenuTrigger className="text-white hover:text-destacado bg-transparent hover:bg-transparent focus:bg-transparent  ">
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid  p-4 m-0  w-max grid-flow-col grid-rows-3 bg-secundario  rounded-lg  !bg-opacity-0 border-0">
                      {item.children.map((child, childIndex) => (
                        <ListItem
                          key={childIndex}
                          title={child.title}
                          href={child.href}
                          description={child.description}
                          className={`text-white bg-transparent hover:bg-transparent hover:text-destacado `}
                        />
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href || "#"}
                    className="text-white bg-transparent hover:bg-transparent focus:bg-transparent transition-colors px-4 py-2 rounded-md  hover:text-destacado"
                  >
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

// Responsive navigation wrapper
export function ResponsiveNavigationMenu({
  items = menuItems,
  className,
}: NavigationMenuProps) {
  return (
    <div className={cn("flex justify-end ", className)}>
      <MobileMenu items={items} />
      <MainNavigationMenu items={items} />
    </div>
  );
}

// Simple navigation menu variant
export function SimpleNavigationMenu({
  items = menuItems,
  className,
}: NavigationMenuProps) {
  return (
    <NavigationMenu className={cn("max-w-none", className)}>
      <NavigationMenuList>
        {items.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.children ? (
              <>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4">
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex}>
                        <NavigationMenuLink asChild>
                          <Link href={child.href || "#"}>{child.title}</Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild>
                <Link
                  href={item.href || "#"}
                  className={navigationMenuTriggerStyle()}
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default ResponsiveNavigationMenu;
