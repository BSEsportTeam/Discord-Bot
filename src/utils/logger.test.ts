import {logger} from '$core/utils/logger';

logger.debug('test debug');
logger.info('test info');
logger.warning('test warning');
logger.error('test error');
logger.debugValues({
	name: 'test',
	id: '111111',
	user: 'John Doe'
});
logger.fatal('impossible to connect to database');
