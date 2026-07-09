import React, { useEffect, useRef, useState } from 'react';

const InterviewRoom = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws');
    setSocket(ws);

    const pc = new RTCPeerConnection();
    setPeerConnection(pc);

    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach(track => pc.addTrack(track, stream));
      });

    pc.ontrack = event => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    ws.onmessage = async event => {
      const data = JSON.parse(event.data);

      if (data.offer) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        ws.send(JSON.stringify({ answer }));
      } else if (data.answer) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
      } else if (data.candidate) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (e) {
          console.error("Error adding ICE candidate", e);
        }
      }
    };

    pc.onicecandidate = event => {
      if (event.candidate) {
        ws.send(JSON.stringify({ candidate: event.candidate }));
      }
    };

    return () => {
      ws.close();
      pc.close();
    };
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <video ref={localVideoRef} autoPlay muted style={{ width: '50%' }} />
      <video ref={remoteVideoRef} autoPlay style={{ width: '50%' }} />
    </div>
  );
};

export default InterviewRoom;
