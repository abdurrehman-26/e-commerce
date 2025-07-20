import NextLink from "next/link";

import { policylinks, quicklinks, supportlinks } from "@/config/site";
import SiteLogo from "./site-logo";

const Footer = () => {
  return (
    <footer className="p-2 py-5 sm:px-4 md:px-6 mx-auto flex-grow border-t border-foreground-100">
      <div className="grid text-sm grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        <div className="col-span-2 md:col-span-3 lg:col-span-1">
          <NextLink className="flex items-center gap-1" href="/">
            <SiteLogo />
          </NextLink>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">QUICK LINKS</p>
          <ul>
            {quicklinks.map((link) => {
              return (
                <li key={link.name} className="mt-3">
                  <NextLink href={link.href}>{link.name}</NextLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">SUPPORT</p>
          <ul>
            {supportlinks.map((link) => {
              return (
                <li key={link.name} className="mt-3">
                  <NextLink href={link.href}>{link.name}</NextLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">POLICY</p>
          <ul>
            {policylinks.map((link) => {
              return (
                <li key={link.name} className="mt-3">
                  <NextLink href={link.href}>{link.name}</NextLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">FOLLOW US</p>
          <ul>
            {policylinks.map((link) => {
              return (
                <li key={link.name} className="mt-3">
                  <NextLink href={link.href}>{link.name}</NextLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <span className="text-sm whitespace-nowrap">Shop.com</span>
        <span className="inline-block w-1 h-1 bg-foreground-500 flex-grow-0 flex-shrink-0" />
        <span className="text-sm">
          © 2025 Shop. All Rights Reserved. |{" "}
          <NextLink href="/">Sitemap</NextLink>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
