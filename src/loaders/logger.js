const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file') // 로그 일자별 생성
const appRoot = require('app-root-path');
const NODE_ENV =require(`${appRoot}/config/index.js`)
const process = require('process')
const logDir = `${appRoot}/logs`; // logs 디렉토리 하위에 로그파일 생성 


const {combine,timestamp,label,printf} = winston.format;

const logFormat = printf(({
    level,
    message,
    label,
    timestamp
})=>{
    return `${timestamp} [${label}] ${level} : ${message}`; //log 출력 포맷 정의  
})

/*
 * Log level
 * error : 0 , warn : 1, info : 2, http :3 , verbose : 4, debug : 5
 * silly : 6
 * 숫자가 작을수록 크다.
 */

 const logger = winston.createLogger({
     format : combine(
         label({
             label : 'book_Square'
         }),
         timestamp({
             format : 'YYYY-MM-DD HH:mm:ss'
         }),
         logFormat //log 출력 포맷.
     ),
     transports : [
         //info 레벨 로그를 저장할 파일 설정  실제 로그를 어떻게 저장할것인가.
         new winstonDaily({
             level : 'info',// info 이상의 모든 로그 레벨이 저장 된다.
             datePattern: 'YYYY-MM-DD',
             dirname: logDir,
             filename : `%DATE%.info.log`,
             maxFiles : 30, //30일치 로그 생성
             zippedArchive :true
         }),
         new winstonDaily({
             //error 레벨의 로그 저장 파일 설정
            level : 'error', // error만 따로 관리하고 싶다.
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename : `%DATE%.error.log`,
            maxFiles : 30, //30일치 로그 생성
            zippedArchive :true
        })
     ],
     exceptionHandlers:[ // uncaughtException 발생시
        new winstonDaily({
            level : 'error',
            datePattern: 'YYYY-MM-DD',
            dirname: logDir,
            filename : `%DATE%.exception.log`,
            maxFiles : 30, //30일치 로그 생성
            zippedArchive :true
        })
     ]
     
 })

 if (process.env.NODE_ENV !=='production'){
    logger.add(new winston.transports.Console({
        format : winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }))
 }


module.exports = logger