const RedisMQ = require("rsmq");
const logger = require("./logger");
const rsmq = new RedisMQ({
  host: process.env.REDIS_IP | "localhost",
  port: process.env.REDIS_PORT | 6377,
  ns: "rsmq",
  realtime: true,
});
logger.info("connected rsmq");

module.exports = {
  deleteQueue: async (qname) => {
    try {
      rsmq.deleteQueue({ qname: qname }, function (err, resp) {
        if (err) {
          logger.error(err);
          return;
        }

        if (resp === 1) {
          logger.info("Queue and all messages deleted.");
        } else {
          logger.info("Queue not found.");
        }
      });
      // logger.info(rsmq);
      return rsmq;
    } catch (error) {
      logger.info("error : ", error);
      throw new error();
    }
  },
  createQueue: async (qname) => {
    rsmq.createQueue({ qname: qname }, function (err, resp) {
      //   logger.infoasync (qname);
      if (err) {
        logger.error(err);
        throw err;
      }
      return true;
    });
  },
  getAllQueue: async (qname) => {
    try {
      rsmq.getQueueAttributes({ qname: qname }, function (err, resp) {
        if (err) {
          logger.error(err);
          throw err;
        }
      });
    } catch (error) {
      logger.info("error : ", error);
      throw new error();
    }
  },
  receivedMessage: async (qname) => {
    try {
      rsmq.receiveMessage({ qname: qname }, function (err, resp) {
        if (err) {
          logger.error(err);
          return;
        }

        if (resp.id) {
          logger.info("Message received.", resp);
        } else {
          logger.info("No messages for me...");
        }
      });
    } catch (error) {
      logger.info("error : ", error);
      throw new error();
    }
  },
  sendMessage: async (qname, message) => {
    try {
      await rsmq.sendMessage(
        {
          qname: qname,
          message: message,
        },
        (err) => {
          if (err) {
            logger.error("err:", err);
            return false;
          }
        }
      );
      return true;
    } catch (error) {
      logger.info("error : ", error);
      throw new error();
    }
  },
  getQueueAttributes: async (qname) => {
    const result = await rsmq.getQueueAttributes(
      { qname: qname },
      function (err, resp) {
        if (err) {
          logger.error(err);
          return false;
        }

        logger.info("==============================================");
        logger.info("=================Queue Stats==================");
        logger.info("==============================================");
        logger.info("visibility timeout: ", resp.vt);
        logger.info("delay for new messages: ", resp.delay);
        logger.info("max size in bytes: ", resp.maxsize);
        logger.info("total received messages: ", resp.totalrecv);
        logger.info("total sent messages: ", resp.totalsent);
        logger.info("created: ", resp.created);
        logger.info("last modified: ", resp.modified);
        logger.info("current n of messages: ", resp.msgs);
        logger.info("hidden messages: ", resp.hiddenmsgs);
        return true;
      }
    );
    logger.info("result : ", result);
    return result;
  },
};
