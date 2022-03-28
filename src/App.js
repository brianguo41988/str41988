import React, { useEffect, useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput, Thread, LoadingIndicator, Message, ChannelList} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';

const apiKey = process.env.REACT_APP_STREAM_API_KEY;

const user = {
  id: 'john',
  name: 'john'
};

const filters = { type: 'messaging', members: {$in: [user.id]}}
const sort = { last_message_at: -1}

export default function App() {
  const [client, setClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance("x6aqfq5rgr7c");

      await chatClient.connectUser(user, chatClient.devToken(user.id));

      const channel = chatClient.channel('messaging', 'react-talk', {
        name: 'Talk about React',
        members: [user.id]

        // have other configurations u can account for
      }); 

      await channel.watch()

      setChannel(channel)
      setClient(chatClient)
    }

    init()

    if (client) return () => client.disconnectUser()

  }, [])

  if (!client) {
    return <LoadingIndicator/>;
  }

  return (
    <Chat client={client} theme="messaging light">
      <ChannelList/>
        filters={}
        sort={}
      <Channel>
        <window>
          <ChannelHeader/>
          <MessageList/>
          <MessageInput/>
        </window>
      </Channel>
    </Chat>
  )

}
