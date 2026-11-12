import type { Locale } from "@/lib/i18n";

type Photo = { src: string; alt: Record<Locale, string> };

const p = (src: string, en = "", fa = ""): Photo => ({ src, alt: { en, fa } });

export const photos = {
  hero: p("/images/hero.jpg"),
  room1: p(
    "/images/room-1.jpg",
    "The dining room at Ambienza, warm and softly lit",
    "سالن غذاخوری آمبینزا، گرم و با نور ملایم"
  ),
  room2: p(
    "/images/room-2.jpg",
    "Wooden wall, set tables and fresh flowers",
    "دیوار چوبی، میزهای چیده‌شده و گل تازه"
  ),
  room3: p(
    "/images/room-3.jpg",
    "Chairs and tables in the restaurant",
    "صندلی‌ها و میزهای رستوران"
  ),
  
  signature: p("/images/dish-salmon.jpg"),
  fish: p("/images/.jpg"),
  rolls: p("/images/menu-rolls.jpg"),
  cake: p("/images/menu-cake.jpg"),
  texture: p("/images/texture.jpg"),
  heat: p("/images/heat.jpg"),
  light: p("/images/light.jpg"),
  reserve: p("/images/reserve.jpg"),
};