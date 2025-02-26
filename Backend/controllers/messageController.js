import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverID } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const senderID = req.id;
    const receiverID = req.params.id;

    const { message } = req.body;

    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderID, receiverID] }, //$all is used to find all data which contains the senderID and receiverID from the above const => In easy way, it shows all the ids of sender and receiver
    });

    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderID, receiverID],
      });
    }

    const newMessage = await Message.create({
      senderID,
      receiverID,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }

    await Promise.all([gotConversation.save(), newMessage.save()]);

    //socket.io
    const receiverSocketID = getReceiverID(receiverID);
    if(receiverSocketID){
      io.to(receiverSocketID).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      newMessage,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderID = req.id;
    const receiverID = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderID, receiverID] },
    }).populate("messages"); //.populate() replaces referenced ObjectIds with actual data from the related collection.

    return res.status(200).json(conversation?.messages);
  } catch (error) {
    console.log(error);
  }
};
