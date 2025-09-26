'use client';

// Phosphor Icons
import { 
  Warning, 
  Shield, 
  Truck, 
  ShoppingBag, 
  Money, 
  Users, 
  Globe, 
  Check, 
  CreditCard, 
  Package, 
  MapPin, 
  TShirt, 
  Plant, 
  Wrench, 
  Hammer, 
  Laptop,
  ArrowRight,
  Plus,
  LinkedinLogo,
  InstagramLogo,
  YoutubeLogo,
  FacebookLogo
} from '@phosphor-icons/react';

export const WarningIcon = () => <Warning size={32} />;
export const ShieldIcon = () => <Shield size={32} />;
export const TruckIcon = () => <Truck size={32} />;
export const StoreIcon = () => <ShoppingBag size={32} />;
export const MoneyIcon = () => <Money size={32} />;
export const UsersIcon = () => <Users size={32} />;
export const GlobeIcon = () => <Globe size={32} />;
export const CheckIcon = () => <Check size={32} />;
export const ShoppingBagIcon = () => <ShoppingBag size={32} />;
export const CreditCardIcon = () => <CreditCard size={32} />;
export const PackageIcon = () => <Package size={32} />;
export const MapIcon = () => <MapPin size={32} />;

// Category Icons
export const TextileIcon = () => <TShirt size={32} />;
export const AgricultureIcon = () => <Plant size={32} />;
export const MachineryIcon = () => <Wrench size={32} />;
export const ConstructionIcon = () => <Hammer size={32} />;
export const TechnologyIcon = () => <Laptop size={32} />;
export const LogisticsIcon = () => <Truck size={32} />;

// Flexible wrappers (accept size/className/weight)
export const ArrowRightIcon = (props: { size?: number; className?: string; weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone' }) => (
  <ArrowRight size={props.size ?? 32} className={props.className} weight={props.weight}
  />
);

export const PlusIcon = (props: { size?: number; className?: string; weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone' }) => (
  <Plus size={props.size ?? 32} className={props.className} weight={props.weight} />
);

export const LinkedinLogoIcon = (props: { size?: number; className?: string; weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone' }) => (
  <LinkedinLogo size={props.size ?? 32} className={props.className} weight={props.weight} />
);

export const InstagramLogoIcon = (props: { size?: number; className?: string; weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone' }) => (
  <InstagramLogo size={props.size ?? 32} className={props.className} weight={props.weight} />
);

export const YoutubeLogoIcon = (props: { size?: number; className?: string; weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone' }) => (
  <YoutubeLogo size={props.size ?? 32} className={props.className} weight={props.weight} />
);

export const FacebookLogoIcon = (props: { size?: number; className?: string; weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone' }) => (
  <FacebookLogo size={props.size ?? 32} className={props.className} weight={props.weight} />
);