import { describe, expect, it } from "vitest";
import { z } from "zod";

import { request } from "./request.js";

describe(request, () => {
  it("should make a json request", async () => {
    const url = "https://api.github.com/repos/fcostarodrigo/ask";

    const response = await request({ url });
    const data = z.object({ id: z.number() }).parse(response);

    expect(data.id).toBe(460_167_459);
  });
});
