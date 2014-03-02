define(function(require, exports, module) {
    var project = require("../../project");
    var goto = require("../../goto");
    var eventbus = require("../../lib/eventbus");
    var options = require("../../lib/options");
    return {
        readFile: function(path, callback) {
            project.readFile(path, function(err, text) {
                if(err) {
                    if(err.message) {
                        return callback(err.message);
                    } else {
                        return callback(""+err);
                    }
                }
                callback(null, text);
            });
        },
        writeFile: function(path, text, callback) {
            project.writeFile(path, text, function(err) {
                if(err) {
                    if(err.message) {
                        return callback(err.message);
                    } else {
                        return callback(""+err);
                    }
                }
                // TODO: perhaps replace with different event?
                eventbus.emit("newfilecreated", path);
                callback();
            });
        },
        listFiles: function(callback) {
            callback(null, goto.getFileCache());
        },
        reloadFileList: function(callback) {
            callback(null, goto.fetchFileList());
        },
        isConfig: function(callback) {
            if (options.get("url").indexOf("config:") === 0) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        }
    };
});