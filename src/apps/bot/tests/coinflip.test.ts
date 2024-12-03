import { CommandInteraction } from 'discord.js';

import coinflipCommand from '../src/commands/head-tails';

describe('Coinflip Command', () => {
  let mockInteraction: jest.Mocked<CommandInteraction>;

  beforeEach(() => {
    mockInteraction = {
      reply: jest.fn()
    } as unknown as jest.Mocked<CommandInteraction>;
  });

  it('should reply with either Heads or Tails', async () => {
    const randomSpy = jest.spyOn(Math, 'random');

    randomSpy.mockReturnValueOnce(0.3);
    await coinflipCommand.execute(mockInteraction);
    expect(mockInteraction.reply).toHaveBeenCalledWith('The coin landed on: Heads');

    randomSpy.mockReturnValueOnce(0.7);
    await coinflipCommand.execute(mockInteraction);
    expect(mockInteraction.reply).toHaveBeenCalledWith('The coin landed on: Tails');

    randomSpy.mockRestore();
  });

  it('should call interaction.reply exactly once', async () => {
    await coinflipCommand.execute(mockInteraction);
    expect(mockInteraction.reply).toHaveBeenCalledTimes(1);
  });

  it('should have the correct command name and description', () => {
    expect(coinflipCommand.data.name).toBe('coinflip');
    expect(coinflipCommand.data.description).toBe('Flips a coin and returns heads or tails');
  });
});
