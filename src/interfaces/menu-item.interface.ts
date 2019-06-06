/**
 * `interface` to difine menu item object
 */
interface IMenuItem {
  readonly icon: string;
  readonly submenu: ISubmenuItem[];
  readonly title: string;
}
