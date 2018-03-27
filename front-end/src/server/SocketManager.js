const io = require('./index.js').io

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, 
		LOGOUT, COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
<<<<<<< HEAD
		TYPING, PRIVATE_MESSAGE, NEW_CHAT_USER, NUM_USER_CONNECTED  } = require('../Events')

const { createUser, createMessage, createChat, getNumUsers } = require('../Factories')
=======
		TYPING, PRIVATE_MESSAGE, NEW_CHAT_USER } = require('../Events')

const { createUser, createMessage, createChat } = require('../Factories')
>>>>>>> 59c4ec94fc297ea86285d56631060cc4587cba83

let connectedUsers = { }

let communityChat = createChat({ isCommunity:true })
<<<<<<< HEAD

let users = 0

=======
let users = 0;
>>>>>>> 59c4ec94fc297ea86285d56631060cc4587cba83
module.exports = function(socket){
					
	// console.log('\x1bc'); //clears console
	console.log("Socket Id:" + socket.id);

	let sendMessageToChatFromUser;

	let sendTypingFromUser;

<<<<<<< HEAD

=======
>>>>>>> 59c4ec94fc297ea86285d56631060cc4587cba83
	//Verify Username
	socket.on(VERIFY_USER, (nickname, callback)=>{
		if(isUser(connectedUsers, nickname)){
			callback({ isUser:true, user:null })
		}else{
			callback({ isUser:false, user:createUser({name:nickname, socketId:socket.id})})
		}
	})

	//User Connects with username
	socket.on(USER_CONNECTED, (user)=>{
		user.socketId = socket.id
		connectedUsers = addUser(connectedUsers, user)
		socket.user = user
		io.sockets.emit("broadcast", {description: `${users += 1} online`})
<<<<<<< HEAD

=======
		
>>>>>>> 59c4ec94fc297ea86285d56631060cc4587cba83
		sendMessageToChatFromUser = sendMessageToChat(user.name)
		sendTypingFromUser = sendTypingToChat(user.name)

		io.emit(USER_CONNECTED, connectedUsers)
		console.log(connectedUsers);

	})
	
	//User disconnects
	socket.on('disconnect', ()=>{
		if("user" in socket){
			connectedUsers = removeUser(connectedUsers, socket.user.name)

			io.emit(USER_DISCONNECTED, connectedUsers)
			console.log("Disconnect", connectedUsers);
			io.sockets.emit("broadcast", {description: `${users -= 1} online`})
<<<<<<< HEAD
=======
			
>>>>>>> 59c4ec94fc297ea86285d56631060cc4587cba83
		}
	})


	//User logsout
	socket.on(LOGOUT, ()=>{
		connectedUsers = removeUser(connectedUsers, socket.user.name)
		io.emit(USER_DISCONNECTED, connectedUsers)
		console.log("Disconnect", connectedUsers);
		io.sockets.emit("broadcast", {description: `${users -= 1} online`})
<<<<<<< HEAD
=======
		
>>>>>>> 59c4ec94fc297ea86285d56631060cc4587cba83
	})

	//Get Community Chat
	socket.on(COMMUNITY_CHAT, (callback)=>{
		callback(communityChat)
	})

	socket.on(MESSAGE_SENT, ({chatId, message})=>{
		sendMessageToChatFromUser(chatId, message)
	})

	socket.on(TYPING, ({chatId, isTyping})=>{
		sendTypingFromUser(chatId, isTyping)
	})

<<<<<<< HEAD

=======
>>>>>>> 59c4ec94fc297ea86285d56631060cc4587cba83
	socket.on(PRIVATE_MESSAGE, ({reciever, sender, activeChat})=>{
		if(reciever in connectedUsers){
			const recieverSocket = connectedUsers[reciever].socketId
			if(activeChat === null || activeChat.id === communityChat.id){
				const newChat = createChat({ name:`${reciever}&${sender}`, users:[reciever, sender] })
				socket.to(recieverSocket).emit(PRIVATE_MESSAGE, newChat)
				socket.emit(PRIVATE_MESSAGE, newChat)
			}else{
				if(!(reciever in activeChat.users)){
					activeChat.users
										.filter( user => user in connectedUsers)
										.map( user => connectedUsers[user] )
										.map( user => {
												socket.to(user.socketId).emit(NEW_CHAT_USER, { chatId: activeChat.id, newUser: reciever })
										} )
										socket.emit(NEW_CHAT_USER, { chatId: activeChat.id, newUser: reciever } )
				}
				socket.to(recieverSocket).emit(PRIVATE_MESSAGE, activeChat)
			}
		}
	})
<<<<<<< HEAD
=======

>>>>>>> 59c4ec94fc297ea86285d56631060cc4587cba83
}
/*
* Returns a function that will take a chat id and a boolean isTyping
* and then emit a broadcast to the chat id that the sender is typing
* @param sender {string} username of sender
* @return function(chatId, message)
*/
function sendTypingToChat(user){
	return (chatId, isTyping)=>{
		io.emit(`${TYPING}-${chatId}`, {user, isTyping})
	}
}

/*
* Returns a function that will take a chat id and message
* and then emit a broadcast to the chat id.
* @param sender {string} username of sender
* @return function(chatId, message)
*/
function sendMessageToChat(sender){
	return (chatId, message)=>{
		io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({message, sender}))
	}
}

/*
* Adds user to list passed in.
* @param userList {Object} Object with key value pairs of users
* @param user {User} the user to added to the list.
* @return userList {Object} Object with key value pairs of Users
*/
function addUser(userList, user){
	let newList = Object.assign({}, userList)
	newList[user.name] = user
	return newList
}

/*
* Removes user from the list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {string} name of user to be removed
* @return userList {Object} Object with key value pairs of Users
*/
function removeUser(userList, username){
	let newList = Object.assign({}, userList)
	delete newList[username]
	return newList
}

/*
* Checks if the user is in list passed in.
* @param userList {Object} Object with key value pairs of Users
* @param username {String}
* @return userList {Object} Object with key value pairs of Users
*/
function isUser(userList, username){
  	return username in userList
}
<<<<<<< HEAD

function numOfUsers(user){
	return (users) =>{
		io.sockets.emit(`${users += 1}`)
	}
}
=======
>>>>>>> 59c4ec94fc297ea86285d56631060cc4587cba83
