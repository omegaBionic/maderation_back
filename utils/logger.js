/* CLASS CONFIGURATION: "debug" / "info" / "error" / "fatal" */
const fs = require('fs')
const mkdirp = require('mkdirp');

class Logger{
  constructor(argProcessName, argLogLevel){
    this.logLevel = argLogLevel;
    this.processName = argProcessName;
    this.logPath = "log/";

    /* define level of logs */
    this.levelDebug = "debug";
    this.levelInfo = "info";
    this.levelError = "error";
    this.levelFatal = "fatal";

    /* open write file */
    mkdirp(this.logPath)
    this.writeStream = fs.createWriteStream(this.getFileName(this.logPath + this.processName))

    this.debug("Initialize logger object in " + argLogLevel + " mode.");
  }

  writeToFile(logToWrite){
    this.writeStream.write(logToWrite + "\n", 'utf8');
  }

  getFileName(processName){
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds() + "-" + today.getMilliseconds();
    let fileName = processName + "_api_" +  date + "_" + time + ".log";
    return fileName;
  }

  getDateTimeNow(){
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + "." + today.getMilliseconds();
    let dateTime = date + " " + time;
    return dateTime;
  }

  concatenateLog(logLevel, log){
    let dateTime = this.getDateTimeNow();
    let returnLog = "";
    if (logLevel == this.levelInfo){
      returnLog = "[" + logLevel.toUpperCase() + " ] " + dateTime  + " " + this.processName + " " + log + ".";
    } else {
      returnLog = "[" + logLevel.toUpperCase() + "] " + dateTime  + " " + this.processName + " " + log + ".";
    }
    return returnLog;
  }

  debug(log){
    if (this.logLevel == this.levelDebug){
      let returnLog = this.concatenateLog(this.levelDebug, log);
      console.log(returnLog);
      this.writeToFile(returnLog);
    }
  }

  info(log){
    if (this.logLevel == this.levelDebug | this.logLevel == this.levelInfo){
      let returnLog = this.concatenateLog(this.levelInfo, log);
      console.log(returnLog);
      this.writeToFile(returnLog);
    }
  }

  error(log){
    if (this.logLevel == this.levelDebug | this.logLevel == this.levelInfo | this.logLevel == this.levelError){
      let returnLog = this.concatenateLog(this.levelError, log);
      console.log(returnLog);
      this.writeToFile(returnLog);
    }
  }

  fatal(log){
    if (this.logLevel == this.levelDebug | this.logLevel == this.levelInfo | this.logLevel == this.levelError | this.logLevel == this.levelFatal){
      let returnLog = this.concatenateLog(this.levelFatal, log);
      console.log(returnLog);
      this.writeToFile(returnLog);
    }
  }
}

module.exports = Logger