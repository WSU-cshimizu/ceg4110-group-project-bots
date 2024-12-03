import { SlashCommandBuilder, GuildMember, PermissionFlagsBits, CommandInteraction } from 'discord.js';

import banCommand from '../src/commands/ban';

describe('Ban Command', () => {
  let mockInteraction: jest.Mocked<any>;
  let mockTarget: jest.Mocked<GuildMember>;

  beforeEach(() => {
    mockTarget = {
      user: {
        tag: 'TestUser#1234'
      },
      ban: jest.fn().mockResolvedValue({})
    } as unknown as jest.Mocked<GuildMember>;

    mockInteraction = {
      options: {
        getMember: jest.fn().mockReturnValue(mockTarget),
        getString: jest.fn().mockReturnValue(null)
      },
      memberPermissions: {
        has: jest.fn().mockReturnValue(true)
      },
      reply: jest.fn().mockResolvedValue({})
    } as unknown as jest.Mocked<CommandInteraction>;
  });

  it('should ban a member when user has permission', async () => {
    await banCommand.execute(mockInteraction);

    expect(mockTarget.ban).toHaveBeenCalledWith({ reason: 'No reason provided' });

    expect(mockInteraction.reply).toHaveBeenCalledWith({
      content: '🚨 TestUser#1234 has been banned. Reason: No reason provided'
    });
  });

  it('should use provided reason when given', async () => {
    (mockInteraction.options.getString as jest.Mock).mockReturnValue('Violation of rules');

    await banCommand.execute(mockInteraction);

    expect(mockTarget.ban).toHaveBeenCalledWith({ reason: 'Violation of rules' });

    expect(mockInteraction.reply).toHaveBeenCalledWith({
      content: '🚨 TestUser#1234 has been banned. Reason: Violation of rules'
    });
  });

  it('should deny ban if user lacks BanMembers permission', async () => {
    (mockInteraction.memberPermissions.has as jest.Mock).mockReturnValue(false);

    await banCommand.execute(mockInteraction);

    expect(mockTarget.ban).not.toHaveBeenCalled();

    expect(mockInteraction.reply).toHaveBeenCalledWith({
      content: 'You do not have permission to ban members.',
      ephemeral: true
    });
  });

  it('should handle case when target member is not found', async () => {
    (mockInteraction.options.getMember as jest.Mock).mockReturnValue(null);

    await banCommand.execute(mockInteraction);

    expect(mockTarget.ban).not.toHaveBeenCalled();

    expect(mockInteraction.reply).toHaveBeenCalledWith({
      content: 'Member not found.',
      ephemeral: true
    });
  });

  it('should have correct command metadata', () => {
    expect(banCommand.data.name).toBe('ban');
    expect(banCommand.data.description).toBe('Bans a member from the server.');

    const options = banCommand.data.toJSON().options;
    expect(options).toHaveLength(2);

    const targetOption = options[0];
    expect(targetOption.name).toBe('target');
    expect(targetOption.type).toBe(6);
    expect(targetOption.required).toBe(true);

    const reasonOption = options[1];
    expect(reasonOption.name).toBe('reason');
    expect(reasonOption.type).toBe(3);
  });
});
