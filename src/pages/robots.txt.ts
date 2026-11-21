import type { APIRoute } from "astro";
import { withBase } from "../utils/paths";

export const GET: APIRoute = () => {
  const body = [
    "User-agent: *",
    "Allow: /",
    `Disallow: ${withBase("/styleguide")}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
