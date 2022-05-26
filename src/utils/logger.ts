import winston from "winston";

const fileTransport = new winston.transports.File({
  level: "info",
  filename: `./logs/app.log`,
  handleExceptions: true,
  maxsize: 5242880, // 5MB
  maxFiles: 5,
});

const consoleTransport = new winston.transports.Console({
  level: "debug",
  handleExceptions: true,
});
const options = {
  file: {
    filename: `/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {},
};
const logger = winston.createLogger({
  format: winston.format.json({
    space: 15,
  }),
  transports: [
    // new winston.transports.File(options.file),
    // new winston.transports.Console(options.console),
    consoleTransport,
    fileTransport,
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export default logger;
