import type { IconCategory } from '../types';
import {
  CameraIcon,
  ComputerIcon,
  GamepadIcon,
  HeadphonesIcon,
  PhoneIcon,
  WatchIcon,
} from '../../../components/icons';

type CategoryCardProps = {
  category: IconCategory;
  active?: boolean;
};

const iconMap = {
  phone: PhoneIcon,
  computer: ComputerIcon,
  watch: WatchIcon,
  camera: CameraIcon,
  headphones: HeadphonesIcon,
  gamepad: GamepadIcon,
} as const;

export function CategoryCard({ category, active = false }: CategoryCardProps) {
  const Icon = iconMap[category.icon];
  return (
    <button
      type="button"
      className={`flex h-36 w-full flex-col items-center justify-center gap-4 rounded border transition ${
        active
          ? 'border-brand bg-brand text-white'
          : 'border-line bg-white text-ink hover:border-brand hover:bg-brand hover:text-white'
      }`}
    >
      <Icon className="h-14 w-14" />
      <span className="text-base">{category.label}</span>
    </button>
  );
}
