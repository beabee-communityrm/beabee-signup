import * as env from './env';

export default {
  logFormat: env.e('BEABEE_LOGFORMAT', ['simple', 'json'] as const, 'json'),
  slackWebhook: env.s('BEABEE_SLACKWEBHOOK', ''),
};
