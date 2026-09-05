import { IBM_Plex_Mono, Manrope, Newsreader } from "next/font/google";

export const displayFont = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-newsreader",
  style: ["normal", "italic"],
});

export const sansFont = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

export const fontVariables = `${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`;
