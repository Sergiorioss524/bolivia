import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "./../trpc";

export const worldbankRouter = createTRPCRouter({
  getIndicator: publicProcedure
    .input(z.object({ indicator: z.string(), country: z.string().optional() }))
    .query(async ({ input }) => {
      const { indicator, country = "BO" } = input;

      const res = await fetch(
        `https://api.worldbank.org/v2/country/${country}/indicator/${indicator}?format=json&per_page=1000`
      );

      const data = await res.json();
      return data[1] ?? [];
    }),
});
