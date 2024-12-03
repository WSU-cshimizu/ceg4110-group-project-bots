import timeoutCommand from '../src/commands/timeout';

describe('Timeout Command', () => {
  let mockInteraction: any;
  let mockTarget: any;

  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    jest.clearAllMocks();

    mockTarget = {
      user: { tag: 'TestUser#1234' },
      timeout: jest.fn()
    };

    mockInteraction = {
      memberPermissions: {
        has: jest.fn().mockReturnValue(true)
      },
      options: {
        getMember: jest.fn().mockReturnValue(mockTarget),
        getInteger: jest.fn().mockReturnValue(10),
        getString: jest.fn().mockReturnValue('Test reason')
      },
      reply: jest.fn()
    };
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should place the user in timeout and reply with a success message', async () => {
    await timeoutCommand.execute(mockInteraction);

    expect(mockTarget.timeout).toHaveBeenCalledWith(10 * 60 * 1000, 'Test reason'); // 10 minutes in ms

    expect(mockInteraction.reply).toHaveBeenCalledWith({
      content: '✅ TestUser#1234 has been placed in timeout for 10 minute(s). Reason: Test reason'
    });
  });

  it('should deny permission if the user does not have ModerateMembers permission', async () => {
    mockInteraction.memberPermissions.has.mockReturnValueOnce(false);

    await timeoutCommand.execute(mockInteraction);

    expect(mockInteraction.reply).toHaveBeenCalledWith({
      content: 'You do not have permission to timeout members.',
      ephemeral: true
    });
  });

  it('should handle error when the timeout method fails', async () => {
    mockTarget.timeout.mockRejectedValueOnce(new Error('Timeout failed'));

    await timeoutCommand.execute(mockInteraction);

    expect(mockInteraction.reply).toHaveBeenCalledWith({
      content: 'Failed to timeout the user. Please try again.',
      ephemeral: true
    });
  });

  it('should handle case where the target user is not found', async () => {
    mockInteraction.options.getMember.mockReturnValueOnce(null);

    await timeoutCommand.execute(mockInteraction);

    expect(mockInteraction.reply).toHaveBeenCalledWith({
      content: 'The specified user was not found.',
      ephemeral: true
    });
  });
});
