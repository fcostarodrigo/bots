import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { setup } from "../testUtils/setup";
import { BotCard } from "./BotCard";
import { useUpdateBot } from "./botsApi";

vi.mock("./botsApi");

const useUpdateBotMock = vi.mocked(useUpdateBot);

const bot = {
  name: "Alfonzo",
  description: "Advenio victoria aveho.",
  botId: "7ea45830-d00d-4bd9-8b6a-e409e9e1169a",
  status: "DISABLED",
  createdAt: 1_728_317_853_764,
  updatedAt: 1_728_261_197_920,
} as const;

describe(BotCard, () => {
  it("should not allow to pause a disabled bot", async () => {
    const mutate = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useUpdateBotMock.mockReturnValue({ mutate } as any);
    const { user } = setup(<BotCard bot={bot} />);

    await user.click(screen.getByRole("button", { name: "Paused" }));

    expect(mutate).not.toHaveBeenCalled();
  });

  it("should allow to enable a disabled bot", async () => {
    const mutate = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useUpdateBotMock.mockReturnValue({ mutate } as any);
    const { user } = setup(<BotCard bot={bot} />);

    await user.click(screen.getByRole("button", { name: "Enabled" }));

    expect(mutate).toHaveBeenCalled();
  });
});
