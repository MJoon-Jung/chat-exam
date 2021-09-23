import io, { Socket } from "socket.io-client";
import { useCallback } from "react";

const backUrl = "http://localhost:3065";

const sockets: { [key: number]: Socket } = {};
const useSocket = (channel?: number): [Socket | undefined, () => void] => {
  console.log("rerender", channel);
  const disconnect = useCallback(() => {
    if (channel) {
      sockets[channel].disconnect();
      delete sockets[channel];
    }
  }, [channel]);
  if (!channel) {
    return [undefined, disconnect];
  }
  if (!sockets[channel]) {
    sockets[channel] = io(`${backUrl}/ws-${channel}`, {
      transports: ["websocket"],
    });
  }

  return [sockets[channel], disconnect];
};

export default useSocket;
