import { Bell } from "@phsa.tec/design-system-react/icons/bell";
import { Compass } from "@phsa.tec/design-system-react/icons/compass";
import { Layers } from "@phsa.tec/design-system-react/icons/layers";
import { LayoutGrid } from "@phsa.tec/design-system-react/icons/layout-grid";
import { MousePointerClick } from "@phsa.tec/design-system-react/icons/mouse-pointer-click";
import { Table2 } from "@phsa.tec/design-system-react/icons/table-2";
import { TextCursorInput } from "@phsa.tec/design-system-react/icons/text-cursor-input";

export type IconType = typeof Bell;

export const CATEGORY_ICONS: Record<string, IconType> = {
  actions: MousePointerClick,
  forms: TextCursorInput,
  "data-display": Table2,
  feedback: Bell,
  overlays: Layers,
  navigation: Compass,
  layout: LayoutGrid,
};
