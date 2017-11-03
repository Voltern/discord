//start setup
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var coolDown = false;
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
//end setup

//start say
bot.on('message', function (user, userID, channelID, message, evt) {
if (message.split(' ')[0] == 'say'){
var args = message.split(' ')
args.shift()
bot.sendMessage({
to: channelID,
message: args.join(' ')});
bot.deleteMessage({
    channelID: channelID,
    messageID: evt.d.id});}});
//end say

//start coolDown
bot.on('message', function (user, userID, channelID, message, evt) {
if (coolDown &&(user!=='bob1171')){
var args = message.split(' ');args.shift();
bot.deleteMessage({channelID: channelID, messageID: evt.d.id});}});

bot.on('message', function (user, userID, channelID, message, evt) {if (message.split(' ')[0] == '!' && (user == 'bob1171' || user == 'MasonTheCoolGuy')){coolDown = !coolDown}});
//end coolDown



bot.on('message', function (user, userID, channelID, message, evt) {
if (message=='help!'){bot.sendMessage({to: channelID,message:
'@Bobbot id: '+
bot.id+
'\nCommands'+
'\nsay {message}: print a message to the channel'
});
}
});



/* send message

bot.sendMessage({
to: 371423576961581057,
message: '{message}'
});

*/