import {
  Home, LayoutDashboard, ShoppingCart, Truck, BookOpen, Package,
  DollarSign, Tag, Users, Settings, LogOut
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Página Inicial", url: "/dashboard", icon: Home },
  { title: "Visão Geral", url: "/visao-geral", icon: LayoutDashboard },
  { title: "Rotas e Logística", url: "/rotas", icon: Truck },
  { title: "PDV", url: "/pdv", icon: ShoppingCart },
  { title: "Catálogo", url: "/catalogo", icon: BookOpen },
  { title: "Estoque", url: "/estoque", icon: Package },
  { title: "Financeiro", url: "/financeiro", icon: DollarSign },
  { title: "Cupons & Promo", url: "/cupons", icon: Tag },
  { title: "Parceiros", url: "/parceiros", icon: Users },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <div className="flex h-14 items-center gap-2 border-b border-sidebar-border px-4">
        <span className="h-6 w-6 flex items-center justify-center text-primary shrink-0 font-sans text-3xl text-center font-extrabold leading-none">F</span>
        {!collapsed && (
          <span className="font-display font-bold text-foreground text-sm whitespace-nowrap">
            Fonte Delivery
          </span>
        )}
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={collapsed ? item.title : undefined}>
                    <NavLink
                      to={item.url}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      activeClassName="bg-primary/10 text-primary font-semibold"
                    >
                      <item.icon className="shrink-0 w-[30px] h-[30px]" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip={collapsed ? "Sair" : undefined}>
              <NavLink
                to="/"
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="shrink-0 w-[30px] h-[30px]" />
                {!collapsed && <span>Sair</span>}
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
