
type LogTypeMethods = 'debug' | 'info' |  'error';

export type LogData <T> = {
	type: LogTypeMethods; 
	payload?: T;
	message?: string;
	error?: Error;
} & ({ 
  // if message be present we don't want the error
	message: string;
} | {
  // if error is present we don't want the message
	error: Error;
});


export type LogMethod = <T>(logData: LogData<T>) => void;

export interface ILoggerProvider {
	debug: LogMethod;
	info: LogMethod;
	warn: LogMethod;
	error: LogMethod;
}
