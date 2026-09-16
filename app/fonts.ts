import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";

export const sansFont = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument-sans",
});

export const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex-mono",
  weight: ["400", "500"],
});

export const fontVariables = `${sansFont.variable} ${monoFont.variable}`;
