import pino from 'pino';
import { injectable } from "inversify";
import { LogMethod, LogData, ILoggerProvider } from "./ILoggerProvider";
import constants from '@src/config/constants';

const pinoLogger = pino({
	level: constants.LOG_LEVEL,
})

const parseLoggerInputToPinoFormat = <T> ({ message, error, ...data }: LogData<T>) => ({
	msg: message,
	err: error,
	...data,
})

@injectable()
export class LoggerProvider implements ILoggerProvider {

  public debug<T>(logData: LogData<T>) {
    pinoLogger.debug(parseLoggerInputToPinoFormat(logData))
  } 
	
  public async info<T>(logData: LogData<T>) {
    pinoLogger.info(parseLoggerInputToPinoFormat(logData))
  } 
	
  public async warn<T>(logData: LogData<T>) {
    pinoLogger.warn(parseLoggerInputToPinoFormat(logData))
  } 
	
  public async error<T>(logData: LogData<T>) {
    pinoLogger.error(parseLoggerInputToPinoFormat(logData))
  } 
}

