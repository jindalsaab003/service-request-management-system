import { Request, Response } from 'express';

export const analyzeRequest = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        error: 'Title and description are required for AI analysis',
      });
    }

    const titleLower = title.toLowerCase();
    const descLower = description.toLowerCase();
    const text = `${titleLower} ${descLower}`;

    // Critical software/system issues
    if (
      text.includes('production is down') ||
      text.includes('application is completely down') ||
      text.includes('system is completely down') ||
      text.includes('everyone is unable to login') ||
      text.includes('all employees') ||
      text.includes('entire application') ||
      text.includes('database failure') ||
      text.includes('production outage') ||
      text.includes('500 error')
    ) {
      return res.status(200).json({
        summary: 'Critical production software outage affecting multiple users.',
        suggestedCategory: 'SOFTWARE',
        suggestedPriority: 'URGENT',
        reason:
          'The issue affects production availability and multiple users, making it an urgent software incident.',
      });
    }

    // VPN/network issues
    if (text.includes('vpn')) {
      return res.status(200).json({
        summary: 'Issues establishing VPN connection to corporate network.',
        suggestedCategory: 'NETWORK',
        suggestedPriority: 'HIGH',
        reason:
          'VPN connectivity issues prevent remote staff from accessing secure systems, warranting high priority.',
      });
    }

    // Internet/Wi-Fi issues
    if (
      text.includes('internet') ||
      text.includes('wifi') ||
      text.includes('wi-fi')
    ) {
      return res.status(200).json({
        summary: 'Internet or Wi-Fi connectivity outage or instability.',
        suggestedCategory: 'NETWORK',
        suggestedPriority: 'MEDIUM',
        reason:
          'Network connectivity is affected, which can interrupt normal work activities.',
      });
    }

    // Hardware issues
    if (
      text.includes('laptop') ||
      text.includes('screen') ||
      text.includes('keyboard') ||
      text.includes('mouse') ||
      text.includes('printer')
    ) {
      return res.status(200).json({
        summary: 'Hardware malfunction affecting an employee device.',
        suggestedCategory: 'HARDWARE',
        suggestedPriority: 'LOW',
        reason:
          'The issue appears to affect a specific hardware device and may be resolved through repair or replacement.',
      });
    }

    // General software/application issues
    if (
      text.includes('software') ||
      text.includes('application') ||
      text.includes('app') ||
      text.includes('system') ||
      text.includes('server') ||
      text.includes('database') ||
      text.includes('login') ||
      text.includes('authentication') ||
      text.includes('error') ||
      text.includes('crash') ||
      text.includes('bug') ||
      text.includes('deployment') ||
      text.includes('api')
    ) {
      return res.status(200).json({
        summary: 'Software or application issue affecting system functionality.',
        suggestedCategory: 'SOFTWARE',
        suggestedPriority: 'HIGH',
        reason:
          'The request describes a software-related problem that may affect application functionality or user access.',
      });
    }

    // Default fallback
    return res.status(200).json({
      summary: 'General support inquiry.',
      suggestedCategory: 'OTHER',
      suggestedPriority: 'MEDIUM',
      reason:
        'The request does not contain enough information to identify a specific technical category or severity.',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'AI Analysis engine failed',
    });
  }
};