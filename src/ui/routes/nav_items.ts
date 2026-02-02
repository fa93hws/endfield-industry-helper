export type RouteKind = 'items' | 'receipts';

export const routes: Record<RouteKind, string> = {
  items: '/',
  receipts: '/receipts',
};

export const navItems: Record<RouteKind, string> = {
  items: '首页',
  receipts: '配方',
};
