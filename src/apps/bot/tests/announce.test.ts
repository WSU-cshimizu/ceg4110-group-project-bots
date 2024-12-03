import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

import announceCommand from '../src/commands/announce';

describe('Announce Command', () => {
  describe('execute', () => {
    let mockChannel: any;
    let mockInteraction: any;

    beforeEach(() => {
      jest.useFakeTimers().setSystemTime(new Date('2024-12-03T04:26:39.877Z'));

      mockChannel = {
        send: jest.fn(),
        guild: {
          id: 'guild-id'
        },
        isSendable: jest.fn().mockReturnValue(true)
      };

      mockInteraction = {
        channel: mockChannel,
        memberPermissions: {
          has: jest.fn().mockReturnValue(true)
        },
        options: {
          getString: jest.fn().mockReturnValue('Test Announcement')
        },
        user: {
          tag: 'TestUser#1234',
          displayAvatarURL: jest.fn().mockReturnValue('https://example.com/avatar.png')
        },
        reply: jest.fn()
      };
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should send an announcement embed to the channel', async () => {
      await announceCommand.execute(mockInteraction);

      const sendCall = mockChannel.send.mock.calls[0][0];
      const embedData = sendCall.embeds[0].data;

      expect(mockChannel.send).toHaveBeenCalledWith(
        expect.objectContaining({
          embeds: [
            expect.objectContaining({
              data: expect.objectContaining({
                color: 16763904,
                description: 'Test Announcement',
                title: '🚨 **Announcement** 🚨',
                timestamp: '2024-12-03T04:26:39.877Z',
                footer: {
                  text: 'Announcement from TestUser#1234',
                  icon_url: 'https://example.com/avatar.png'
                }
              })
            })
          ]
        })
      );

      expect(mockInteraction.reply).toHaveBeenCalledWith({
        content: 'Your announcement has been sent!',
        ephemeral: true
      });
    });

    it('should handle errors when sending the announcement', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      mockChannel.send.mockRejectedValue(new Error('Mocked error'));

      await announceCommand.execute(mockInteraction);

      expect(mockInteraction.reply).toHaveBeenCalledWith({
        content: 'An error occurred while sending the announcement.',
        ephemeral: true
      });

      consoleErrorSpy.mockRestore();
    });

    it('should deny permission if user lacks ManageMessages', async () => {
      mockInteraction.memberPermissions.has.mockReturnValue(false);

      await announceCommand.execute(mockInteraction);

      expect(mockInteraction.reply).toHaveBeenCalledWith({
        content: 'You do not have permission to send announcements!',
        ephemeral: true
      });
    });
  });
});
