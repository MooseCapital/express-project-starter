const cron = require('node-cron');

const initScheduledJobs = () => {
      const testJob = cron.schedule(" */1 * * * *", () => {
        console.log("cron test");
        // runs every 1 minute, if we put ("1 * * * *") -> it would run every minute 1 of every hour
            //-> to run every second we would do "*/1 * * * * *"
      });
      testJob.start();


}

module.exports = {initScheduledJobs}