import { useEffect, useState } from "react";
import { auth, db } from "../../Config";
import { addDoc, collection, onSnapshot, query, where, serverTimestamp, orderBy } from "firebase/firestore";
import PropTypes from "prop-types";
import './Chat.css'; // Make sure to import the CSS file

const Chat = (props) => {
  const { room } = props;

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMsg = query(messageRef, where("room", "==", room), orderBy("createdAt"));

    const unsub = onSnapshot(queryMsg, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id }; // Add doc id to avoid key warnings
      });
      setMessages(messages);
    });

    return () => unsub(); // Clean up the subscription
  }, [room]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage.trim() === "") return;
    await addDoc(messageRef, {
      message: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room: room,
      profilePic: auth.currentUser.photoURL,
    });
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <h2>Chat Room: {room}</h2>
      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.user === auth.currentUser.displayName ? 'sent' : 'received'}`}
          >
            <img src={message.profilePic} alt="User Profile" className="profile-pic" />
            <div className="message-content">
              <strong>{message.user}</strong>
              <p>{message.message}</p>
              <span className="message-time">
                {message.createdAt
                  ? message.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  : "Sending..."}
              </span>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          name="message"
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="message-input"
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

Chat.propTypes = {
  room: PropTypes.string.isRequired,
};

export default Chat;
